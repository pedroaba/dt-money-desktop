use std::fs;
use std::string::ToString;
use std::sync::Mutex;
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};


const LIMIT: u16 = 10;


struct AppTransactionState {
    database_conn: sqlite::Connection
}


impl AppTransactionState {
    pub fn new() -> Self {
        let appdata = dirs::data_dir().unwrap();
        let app_folder = format!("{}/dt-money", appdata.display());

        let does_dir_exists = fs::metadata(&app_folder).is_ok();
        if !does_dir_exists {
            fs::create_dir_all(&app_folder).unwrap();
        }

        let db_path = format!("{}/database.sqlite", app_folder);

        let app_transaction_state = AppTransactionState {
            database_conn: sqlite::open(db_path).unwrap()
        };

        app_transaction_state.setup();

        app_transaction_state
    }

    fn setup(&self) {
        let query = "
            create table if not exists transactions (
                id text primary key,
                description text not null,
                price float not null,
                category varchar(255) not null,
                transaction_type varchar(16) not null,
                created_at datetime not null default current_timestamp
            )
        ";

        self.database_conn.execute(query).unwrap();
    }
}

lazy_static! {
    static ref APP_TRANSACTION_STATE: Mutex<AppTransactionState> = Mutex::new(
        AppTransactionState::new()
    );
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Transaction {
    id: Option<String>,
    created_at: Option<String>,
    description: String,
    category: String,
    transaction_type: String,
    price: f64
}

impl Transaction {
    fn from_raw_data(data: &[(&str, Option<&str>)]) -> Option<Transaction> {
        // Verificando se os dados fornecidos estão completos
        if data.len() != 6 {
            return None;
        }

        // Convertendo os dados brutos em tipos apropriados
        let id = data[0].1.unwrap_or_default().to_string(); // Assuming id is the first element
        let created_at = data[5].1.unwrap_or_default().to_string(); // Assuming created_at is the second element
        let description = data[1].1.unwrap_or_default().to_string();
        let category = data[3].1.unwrap_or_default().to_string();
        let transaction_type = data[4].1.unwrap_or_default().to_string();
        let price = data[2].1.and_then(|s| s.parse().ok()).unwrap_or(0.0);

        // Criando uma instância de Transaction com os dados convertidos
        Some(Transaction {
            id: Some(id.to_string()),
            description,
            category,
            transaction_type,
            price,
            created_at: Some(created_at),
        })
    }
}

#[derive(Serialize, Deserialize)]
pub struct ResponseMessage {
    success: bool,
    message: String,
    error: String
}

#[tauri::command]
pub fn make_transaction(transaction: Transaction) -> ResponseMessage {
    let state = APP_TRANSACTION_STATE.lock().unwrap();

    return if let Err(op) = state.database_conn.execute(format!(
        "insert into transactions (id, description, category, transaction_type, price) values ('{}', '{}', '{}', '{}', {})",
        uuid::Uuid::new_v4().to_string(),
        transaction.description,
        transaction.category,
        transaction.transaction_type,
        transaction.price
    )) {
        ResponseMessage {
            success: false,
            message: "Houve um erro durante o cadastro da transação".to_string(),
            error: op.to_string()
        }
    } else {
        ResponseMessage {
            success: true,
            message: "Transação cadastrada com sucesso".to_string(),
            error: "".to_string()
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct ResponseListTransactions {
    results: Vec<Transaction>,
    total: u8,
    success: bool
}

#[tauri::command]
pub fn load_transactions(page: u16) -> ResponseListTransactions {
    let state = APP_TRANSACTION_STATE.lock().unwrap();
    let mut transactions: Vec<Transaction> = vec![];

    let offset = page * LIMIT;
    let query = format!("select * from transactions limit {} offset {}", LIMIT, offset);

    match state.database_conn.iterate(
        query.to_string(),
        |result| {
            transactions.push(
                Transaction::from_raw_data(result).unwrap()
            );

            true
    }) {
        Err(_) => {
            return ResponseListTransactions {
                results: vec![],
                total: 0,
                success: false,
            };
        }
        _ => {}
    }

    let query = "select count(*) as total from transactions".to_string();
    let mut total = 0;
    match state.database_conn.iterate(
        query.to_string(),
        |result| {
            total = result[0].1.and_then(|s| s.parse().ok()).unwrap_or(0);

            true
        }) {
        Err(_) => {
            return ResponseListTransactions {
                results: vec![],
                total: 0,
                success: false,
            };
        }
        _ => {}
    }

    ResponseListTransactions {
        results: transactions,
        total,
        success: true,
    }
}

pub fn setup_database() {
    let state = APP_TRANSACTION_STATE.lock().unwrap();

    state.setup();
}
