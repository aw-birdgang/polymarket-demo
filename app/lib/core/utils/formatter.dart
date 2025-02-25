import 'package:intl/intl.dart';
import 'package:web3dart/web3dart.dart';

/// 📅 타임스탬프를 날짜 형식으로 포맷팅
/// - `timestamp`: 유닉스 타임스탬프 (초 단위)
/// - `format`: 날짜 포맷 (기본: 'yyyy-MM-dd HH:mm:ss')
/// 예시) 1692380461 → '2023-08-18 14:21:01'
String formatTimestamp(int timestamp, {String format = 'yyyy-MM-dd HH:mm:ss'}) {
  final date = DateTime.fromMillisecondsSinceEpoch(timestamp * 1000);
  return DateFormat(format).format(date);
}

/// 💰 이더리움 Wei 값을 ETH로 변환 및 포맷팅
/// - `wei`: Wei 값 (BigInt)
/// - `decimals`: 소수점 자리수 (기본: 4)
/// 예시) 1000000000000000000 → '1.0000'
String formatEthFromWei(BigInt wei, {int decimals = 4}) {
  final eth = wei / BigInt.from(10).pow(18);
  return eth.toStringAsFixed(decimals);
}

/// 💸 ETH 값을 Wei(BigInt)로 변환
/// - `eth`: ETH 값 (double)
/// 예시) 1.5 → 1500000000000000000
BigInt formatWeiFromEth(double eth) {
  return BigInt.from(eth * 1e18);
}

/// 🔢 숫자 포맷팅 (소수점 자리수 제한)
/// - `number`: double 형 숫자
/// - `decimals`: 소수점 자리수 (기본: 2)
/// 예시) 3.141592 → '3.14'
String formatNumber(double number, {int decimals = 2}) {
  return number.toStringAsFixed(decimals);
}