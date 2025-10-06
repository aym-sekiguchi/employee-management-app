#!/bin/zsh
# employee-management-app 開発環境一括起動スクリプト

set -e

echo "🚀 employee-management-app 開発環境を起動中..."

# MySQLサーバー起動
echo "📊 MySQLサーバー起動..."
mysql.server start
sleep 2

# データベース接続確認
echo "🔍 データベース接続確認..."
if mysql -u root -e "USE employee_management;" 2>/dev/null; then
  echo "✅ MySQL接続成功"
else
  echo "❌ MySQL接続失敗 - データベースを初期化してください"
  echo "   実行: cd api && npm run db:init"
  exit 1
fi

# APIサーバー起動
echo "🖥️  APIサーバー起動..."
cd api
npm run dev &
API_PID=$!
cd ..

# Webアプリ起動
echo "🌐 Webアプリ起動..."
cd web
npm run dev &
WEB_PID=$!
cd ..

echo "🎉 開発環境起動完了！"
echo ""
echo "📋 アクセス情報:"
echo "   API: http://localhost:3000"
echo "   Web: http://localhost:5173"
echo "   ヘルスチェック: http://localhost:3000/health"
echo ""
echo "🛑 停止: Ctrl+C"

# 終了ハンドリング
trap 'echo ""; echo "🛑 開発環境を停止中..."; kill $API_PID 2>/dev/null; kill $WEB_PID 2>/dev/null; mysql.server stop; exit' SIGINT SIGTERM

wait $API_PID $WEB_PID