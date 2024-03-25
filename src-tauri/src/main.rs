// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod transaction;

use transaction::setup_database;
use crate::transaction::{make_transaction, load_transactions, load_summary};

fn main() {
  tauri::Builder::default()
      .setup(|_app| {
        setup_database();
        Ok(())
      })
    .invoke_handler(tauri::generate_handler![
        make_transaction,
        load_transactions,
        load_summary
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
