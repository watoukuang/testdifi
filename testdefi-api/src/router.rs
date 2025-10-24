use axum::{routing::get, Router};
use axum::routing::{post, delete};
use crate::service::{items, cex, kol, twitter, health};
use crate::service::{meta, forks, contracts, trace};
use crate::app::AppState;
use crate::service::binlog::{binlog_add_batch_handler, binlog_add_handler, binlog_list_handler};

pub fn build_router() -> Router<AppState> {
    Router::new()
        .merge(health_router())
        .merge(meta_router())
        .merge(api_router())
        .merge(items_router())
        .merge(feeds_router())
        .merge(binlog_router())
}

fn health_router() -> Router<AppState> {
    Router::new()
        .route("/health", get(health::health))
        .route("/healthz", get(meta::healthz))
}

fn items_router() -> Router<AppState> {
    Router::new()
        .route("/items", get(items::list).post(items::create))
        .route("/items/:id", get(items::get).put(items::update).delete(items::delete))
}

fn feeds_router() -> Router<AppState> {
    Router::new()
        .route("/cexs", get(cex::list))
        .route("/kols", get(kol::list))
        .route("/twitters", get(twitter::list))
}

pub fn binlog_router() -> Router<AppState> {
    Router::new()
        .route("/binlog", get(binlog_list_handler))          // 查询
        .route("/binlog/add", post(binlog_add_handler))     // 添加单条
        .route("/binlog/add_batch", post(binlog_add_batch_handler)) // 添加多条
}

fn meta_router() -> Router<AppState> {
    Router::new()
        .route("/", get(meta::root))
        .route("/version", get(meta::version))
}

fn api_router() -> Router<AppState> {
    Router::new()
        .route("/api/ping", get(meta::ping))
        // forks
        .route("/api/forks", post(forks::create).get(forks::list))
        .route("/api/forks/:id", delete(forks::delete))
        // contracts
        .route("/api/contracts/call", post(contracts::call))
        .route("/api/contracts/send", post(contracts::send))
        .route("/api/contracts/deploy", post(contracts::deploy))
        // trace
        .route("/api/trace/tx", post(trace::tx))
}