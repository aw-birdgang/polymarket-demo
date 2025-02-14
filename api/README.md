
## Run tests

```bash
📌 1. API 목록 (List of APIs)
아래는 Polymarket의 Backend Infrastructure에서 필요한 API 목록입니다.

✅ 1️⃣ 시장 (Liquidity) 관련 API

POST	
/market/create	
새로운 예측 시장 생성

GET	
/market/list	
모든 예측 시장 목록 조회

GET	
/market/:id	
특정 시장 정보 조회

POST	
/market/resolve/:id	
시장 결과 확정 (오라클 데이터 기반)


✅ 2️⃣ 베팅 (Bet) 관련 API

POST	
/bet/place	
베팅하기 (YES/NO 선택)

GET	
/bet/list/:marketId	
특정 시장의 베팅 내역 조회

GET	
/bet/user/:userId	
특정 사용자의 베팅 내역 조회


✅ 3️⃣ 유동성 공급 (Liquidity) 관련 API

POST	
/liquidity/provide	
유동성 공급

GET	
/liquidity/pool/:marketId	
특정 시장의 유동성 풀 상태 조회


✅ 4️⃣ 지갑 & 결제 (Wallet & Payment) 관련 API

POST	
/wallet/deposit	
지갑에 USDC 예치

POST	
/wallet/withdraw	
지갑에서 출금

GET	
/wallet/balance/:userId	
특정 사용자의 지갑 잔액 조회

```


## 설치 및 실행
```bash
docker compose -f docker-compose.app.dev.yml up --build
```
