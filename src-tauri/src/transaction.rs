use std::fs;
use std::string::ToString;
use std::sync::Mutex;
use lazy_static::lazy_static;
use serde::{Deserialize, Serialize};


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
    description: String,
    category: String,
    transaction_type: String,
    price: f64
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

    println!("{:?}", transaction);

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

pub fn setup_database() {
    let state = APP_TRANSACTION_STATE.lock().unwrap();

    state.setup();
}
