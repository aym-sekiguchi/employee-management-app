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

# 起動確認（最大10秒待機）
echo "⏳ APIサーバー起動確認中..."
for i in {1..10}; do
  if curl -s http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ APIサーバー起動成功"
    break
  fi
  if ! kill -0 $API_PID 2>/dev/null; then
    echo "❌ APIサーバー起動失敗"
    exit 1
  fi
  sleep 1
done

# Webアプリ起動
echo "🌐 Webアプリ起動..."
cd web
npm run dev &
WEB_PID=$!
cd ..

# 起動確認（最大5秒待機）
echo "⏳ Webアプリ起動確認中..."
for i in {1..5}; do
  if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "✅ Webアプリ起動成功"
    break
  fi
  if ! kill -0 $WEB_PID 2>/dev/null; then
    echo "❌ Webアプリ起動失敗"
    cleanup
    exit 1
  fi
  sleep 1
done
echo "🎉 開発環境起動完了！"
echo ""
echo "📋 アクセス情報:"
echo "   API: http://localhost:3000"
echo "   Web: http://localhost:5173"
echo "   ヘルスチェック: http://localhost:3000/health"
echo ""
echo "🛑 停止: Ctrl+C"

# 終了ハンドリング
cleanup() {
  echo ""
  echo "🛑 開発環境を停止中..."
  kill -TERM $API_PID 2>/dev/null
  kill -TERM $WEB_PID 2>/dev/null
  # プロセスが終了するまで最大5秒待機
  for i in {1..5}; do
    if ! kill -0 $API_PID 2>/dev/null && ! kill -0 $WEB_PID 2>/dev/null; then
      break
    fi
    sleep 1
  done
  # まだ生きていれば強制終了
  kill -KILL $API_PID 2>/dev/null
  kill -KILL $WEB_PID 2>/dev/null
  mysql.server stop
  exit
}
trap 'cleanup' SIGINT SIGTERM

wait $API_PID $WEB_PID