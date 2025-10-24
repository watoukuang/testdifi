use axum::{Json, response::IntoResponse};
use serde::Serialize;
use crate::models::ApiResponse;

#[derive(Serialize)]
struct MetaRoot {
    name: &'static str,
    status: &'static str,
}

#[derive(Serialize)]
struct HealthZ { status: &'static str }

#[derive(Serialize)]
struct Version { version: &'static str }

pub async fn root() -> impl IntoResponse {
    Json(ApiResponse::ok(MetaRoot { name: "testdefi-api", status: "ok" }))
}

pub async fn healthz() -> Json<ApiResponse<HealthZ>> {
    Json(ApiResponse::ok(HealthZ { status: "ok" }))
}

pub async fn version() -> Json<ApiResponse<Version>> {
    // static placeholder; can be wired to env/cargo later
    Json(ApiResponse::ok(Version { version: "0.1.0" }))
}

#[derive(Serialize)]
struct Pong { message: &'static str }

pub async fn ping() -> Json<ApiResponse<Pong>> {
    Json(ApiResponse::ok(Pong { message: "pong" }))
}
