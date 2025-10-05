# 社員管理アプリ（シンプル版）

## 概要

TypeScript を使用したシンプルな社員管理システム

## 技術スタック

- バックエンド: Fastify + TypeScript
- フロントエンド: React + TypeScript
- データベース: MySQL
- インフラ: AWS (App Runner, S3, CloudFront)

## 開発環境のセットアップ

### 1. リポジトリのクローンと依存関係のインストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd employee-management-app

# 各ディレクトリで依存関係をインストール
cd api && npm install
cd ../web && npm install
```

### 2. 環境変数の設定

```bash
# APIディレクトリで環境変数ファイルを作成
cd api
cp .env.example .env

# .envファイルを編集してMySQLの接続情報を設定
```

### 3. 開発サーバーの起動

```bash
# APIサーバー（ポート3000）
cd api
npm run dev

# Webアプリ（ポート5173）
cd web
npm run dev
```

### 4. 動作確認

```bash
# ヘルスチェック
curl http://localhost:3000/health
```

## テスト実行

```bash
# APIのテスト
cd api
npm run test
```
