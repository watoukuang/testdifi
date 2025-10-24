use axum::Json;
use serde::{Deserialize, Serialize};
use crate::models::ApiResponse;

#[derive(Serialize, Deserialize)]
pub struct CallReq {
    pub address: String,
    pub method: String,
    #[serde(default)] pub params: serde_json::Value,
    #[serde(default)] pub rpcUrl: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct SendReq {
    pub from: String,
    pub address: String,
    pub method: String,
    #[serde(default)] pub params: serde_json::Value,
    #[serde(default)] pub value: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct DeployReq {
    pub template: String,
    #[serde(default)] pub args: serde_json::Value,
}

pub async fn call(Json(req): Json<CallReq>) -> Json<ApiResponse<serde_json::Value>> {
    Json(ApiResponse::ok(serde_json::json!({
        "success": true,
        "message": "mock call",
        "data": {
            "address": req.address,
            "method": req.method,
            "params": req.params,
            "rpcUrl": req.rpcUrl,
        }
    })))
}

pub async fn send(Json(req): Json<SendReq>) -> Json<ApiResponse<serde_json::Value>> {
    Json(ApiResponse::ok(serde_json::json!({
        "success": true,
        "message": "mock send",
        "data": {
            "txHash": "0xmock",
            "from": req.from,
            "address": req.address,
            "method": req.method,
            "params": req.params,
            "value": req.value,
        }
    })))
}

pub async fn deploy(Json(req): Json<DeployReq>) -> Json<ApiResponse<serde_json::Value>> {
    Json(ApiResponse::ok(serde_json::json!({
        "success": true,
        "message": "mock deploy",
        "data": {
            "address": "0xDeaDbeefDeaDbeefDeaDbeefDeaDbeefDeaDbeef",
            "template": req.template,
            "args": req.args,
        }
    })))
}
