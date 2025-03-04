import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/src/client.dart';
import 'package:web3dart/web3dart.dart';

import '../../core/utils/dio/dio_exception_util.dart';
import '../../domain/entry/market/market.dart';


/// 🔥 CommentRepository
/// 📌 Comment 데이터를 가져오는 역할 (블록체인 또는 서버 연동)
class CommentRepository {
  // 🔑 환경 변수 가져오기
  final String infuraKey = dotenv.env['INFURA_KEY']!;
  final String contractAddress = dotenv.env['PREDICTION_MARKET_ADDRESS']!;

  // 🌐 Ethereum 네트워크 설정
  late final Web3Client _client;
  late final DeployedContract _contract;
  late final ContractFunction _marketCount;
  late final ContractFunction _getMarketInfo;

  // ⛓️ 컨트랙트 ABI
  final String _abi = '''
    [
      {"constant":true,"inputs":[],"name":"marketCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
      {"constant":true,"inputs":[{"name":"_marketId","type":"uint256"}],"name":"getMarketInfo","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint8"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}
    ]
  ''';

  /// 📦 Constructor
  CommentRepository() {
    _client = Web3Client(
      'https://sepolia.infura.io/v3/$infuraKey',
      Dio() as Client,
    );

    _contract = DeployedContract(
      ContractAbi.fromJson(_abi, 'PredictionMarket'),
      EthereumAddress.fromHex(contractAddress),
    );

    _marketCount = _contract.function('marketCount');
    _getMarketInfo = _contract.function('getMarketInfo');
  }

  /// 🔍 전체 Comment 정보 가져오기
  Future<List<Market>> fetchMarkets() async {
    try {
      // 🔹 1️⃣ Comment Count 가져오기
      final countResult = await _client.call(
        contract: _contract,
        function: _marketCount,
        params: [],
      );
      final count = (countResult.first as BigInt).toInt();
      print('🔍 Total Comment Count: $count');

      // 🔹 2️⃣ Comment 정보 가져오기
      final List<Market> marketList = [];
      for (int i = 0; i < count; i++) {
        final info = await _client.call(
          contract: _contract,
          function: _getMarketInfo,
          params: [BigInt.from(i)],
        );

        // 🔸 3️⃣ Comment 모델에 맞게 데이터 매핑
        final market = Market(
          id: i.toString(), // 수정: id를 String으로 변환
          question: info[0] as String,
          endTime: DateTime.fromMillisecondsSinceEpoch(
            (info[1] as BigInt).toInt() * 1000,
          ),
          resolved: info[6] as bool,
          outcome: false,  // 🔥 추가: outcome 필드 기본값 (필요하면 스마트 컨트랙트 수정)
        );

        marketList.add(market);
        print('✅ Loaded Comment: ${market.question}');
      }

      return marketList;
    } catch (error) {
      print('❌ Error in fetchMarkets: $error');
      throw DioExceptionUtil.handleError(error);
    }
  }


}
