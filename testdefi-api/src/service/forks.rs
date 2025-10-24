use axum::{Json, extract::Path};
use serde::{Deserialize, Serialize};
use crate::models::ApiResponse;

#[derive(Serialize, Deserialize, Clone)]
pub struct ForkReq {
    pub label: String,
    #[serde(default, skip_serializing_if = "Option::is_none")] pub rpcUrl: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")] pub baseBlock: Option<u64>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct ForkItem {
    pub id: String,
    pub label: String,
    pub rpcUrl: String,
    #[serde(default, skip_serializing_if = "Option::is_none")] pub baseBlock: Option<u64>,
    pub createdAt: String,
}

pub async fn create(Json(req): Json<ForkReq>) -> Json<ApiResponse<ForkItem>> {
    let id = uuid_like();
    let item = ForkItem {
        id,
        label: req.label,
        rpcUrl: req.rpcUrl.unwrap_or_else(|| "http://localhost:8545".to_string()),
        baseBlock: req.baseBlock,
        createdAt: chrono::Utc::now().to_rfc3339(),
    };
    Json(ApiResponse::ok(item))
}

pub async fn list() -> Json<ApiResponse<Vec<ForkItem>>> {
    Json(ApiResponse::ok(vec![]))
}

pub async fn delete(Path(_id): Path<String>) -> Json<ApiResponse<serde_json::Value>> {
    Json(ApiResponse::ok(serde_json::json!({ "deleted": true })))
}

fn uuid_like() -> String {
    use std::time::{SystemTime, UNIX_EPOCH};
    let t = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_millis();
    format!("fork-{}", t)
}
