# 📊 Polymarket Liquidity Supply & Betting Simulation  

This document analyzes how **the liquidity pool changes when 5 traders place bets** after liquidity has been supplied to a Polymarket prediction market.  

---

## 🔄 **1. Initial Liquidity Supply (Alice: LP)**  

- **Alice (Liquidity Provider, LP)** supplies **$10,000** equally to the YES/NO market  
- ✅ Initial liquidity pool:  
  - **YES Pool:** $5,000  
  - **NO Pool:** $5,000  

---

## 🎯 **2. 5 Traders Place Bets (Liquidity Pool Simulation)**  

| Step | Trader | Event Direction | Event Amount | YES Pool After Event | NO Pool After Event | Liquidity Ratio (YES:NO) |
|---|---|---|---|---|---|---|
| 1️⃣ | Bob | YES | $2,000 | **$7,000** | $5,000 | **58.3% : 41.7%** |
| 2️⃣ | Charlie | NO | $3,000 | $7,000 | **$8,000** | **46.7% : 53.3%** |
| 3️⃣ | Dave | YES | $4,000 | **$11,000** | $8,000 | **57.9% : 42.1%** |
| 4️⃣ | Emma | NO | $2,500 | $11,000 | **$10,500** | **51.2% : 48.8%** |
| 5️⃣ | Frank | YES | $1,500 | **$12,500** | $10,500 | **54.3% : 45.7%** |

📌 **Liquidity Ratio Calculation Formula:**  
```math
YES Ratio = (YES Pool / (YES Pool + NO Pool)) × 100
NO Ratio = (NO Pool / (YES Pool + NO Pool)) × 100

---

## **📊 3. Liquidity Pool Ratio Changes

1️⃣ Bob bets on YES → YES ratio increases (50% → 58.3%)
2️⃣ Charlie bets on NO → NO ratio increases (YES 58.3% → 46.7%)
3️⃣ Dave bets on YES → YES ratio increases (YES 46.7% → 57.9%)
4️⃣ Emma bets on NO → NO ratio increases (YES 57.9% → 51.2%)
5️⃣ Frank bets on YES → YES ratio final increase (YES 51.2% → 54.3%)

✅ Final Liquidity Ratio:

YES: 54.3%
NO: 45.7%
✅ More bets on YES resulted in market adjustment.
✅ With sufficient liquidity, the market remains stable and does not fluctuate drastically.

---

## **📌 4. Conclusion

✔ Liquidity providers ensure market stability and allow smooth betting operations.
✔ The market adjusts dynamically in real-time based on user bets.
✔ Lack of liquidity can cause market fluctuations, making initial liquidity supply crucial.

🚀 Polymarket is a probability-based prediction market, so analyzing market trends and betting at the right time is key!
