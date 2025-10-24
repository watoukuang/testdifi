use axum::Json;
use serde::{Deserialize, Serialize};
use crate::models::ApiResponse;

#[derive(Serialize, Deserialize)]
pub struct TraceReq {
    pub txHash: String,
    #[serde(default)] pub rpcUrl: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct TraceResp {
    pub callStack: Vec<String>,
    pub storageDiff: Vec<String>,
}

pub async fn tx(Json(req): Json<TraceReq>) -> Json<ApiResponse<TraceResp>> {
    let resp = TraceResp {
        callStack: vec![format!("CALL to {}", req.txHash)],
        storageDiff: vec!["slot0 changed".into()],
    };
    Json(ApiResponse::ok(resp))
}
