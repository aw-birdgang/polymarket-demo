import 'package:mobx/mobx.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:web3dart/web3dart.dart';
import 'package:http/http.dart'; // 📌 Web3Client requires HTTP Client

import '../../utils/dio/dio_exception_util.dart';

part 'transaction_store.g.dart';

/// 🎲 트랜잭션 상태 관리 MobX 스토어
class TransactionStore = _TransactionStore with _$TransactionStore;

abstract class _TransactionStore with Store {
  // 🔑 환경 변수 가져오기
  final String infuraKey = dotenv.env['INFURA_KEY']!;
  final String privateKey = dotenv.env['DEPLOYER_PRIVATE_KEY']!;
  final String contractAddress = dotenv.env['PREDICTION_MARKET_ADDRESS']!;

  // 🌐 Ethereum 네트워크 설정
  late final Web3Client web3client;
  late final EthPrivateKey credentials;
  late final DeployedContract predictionMarket;

  // ⛓️ 컨트랙트 ABI
  final String abi = '''
    [
      {"constant":false,"inputs":[{"name":"_question","type":"string"},{"name":"_endTime","type":"uint256"}],"name":"createMarket","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
      {"constant":false,"inputs":[{"name":"_marketId","type":"uint256"},{"name":"_betOnYes","type":"bool"}],"name":"placeBet","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},
      {"constant":false,"inputs":[{"name":"_marketId","type":"uint256"},{"name":"outcomeYes","type":"bool"}],"name":"resolveMarket","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
      {"constant":false,"inputs":[{"name":"_marketId","type":"uint256"}],"name":"claimWinnings","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}
    ]
  ''';

  // 🔄 트랜잭션 상태 관리
  @observable
  bool isLoading = false;

  @observable
  String? transactionHash;

  @observable
  String? errorMessage;

  // 🎯 초기화
  _TransactionStore() {
    // 🔌 Web3Client 연결
    web3client = Web3Client(
      'https://sepolia.infura.io/v3/$infuraKey',
      Client(),
    );

    // 🔑 Private Key 설정
    credentials = EthPrivateKey.fromHex(privateKey);

    // 🔗 컨트랙트 인스턴스 생성
    predictionMarket = DeployedContract(
      ContractAbi.fromJson(abi, "PredictionMarket"),
      EthereumAddress.fromHex(contractAddress),
    );
  }

  // 🛠️ 트랜잭션 초기화
  @action
  void reset() {
    isLoading = false;
    transactionHash = null;
    errorMessage = null;
  }

  // 🎲 1️⃣ Market 생성 트랜잭션
  @action
  Future<void> createMarket(String question, int endTime) async {
    isLoading = true;
    errorMessage = null;

    try {
      final function = predictionMarket.function('createMarket');
      final tx = await web3client.sendTransaction(
        credentials,
        Transaction.callContract(
          contract: predictionMarket,
          function: function,
          parameters: [question, BigInt.from(endTime)],
        ),
        chainId: 11155111, // Sepolia Testnet
      );
      transactionHash = tx;
    } catch (error) {
      errorMessage = DioExceptionUtil.handleError(error);
    } finally {
      isLoading = false;
    }
  }

  // 🎲 2️⃣ 베팅 트랜잭션
  @action
  Future<void> placeBet(String marketId, bool betOnYes, double amount) async {
    isLoading = true;
    errorMessage = null;

    try {
      final function = predictionMarket.function('placeBet');
      final tx = await web3client.sendTransaction(
        credentials,
        Transaction.callContract(
          contract: predictionMarket,
          function: function,
          parameters: [marketId, betOnYes],
          value: EtherAmount.fromUnitAndValue(EtherUnit.ether, amount),
        ),
        chainId: 11155111,
      );
      transactionHash = tx;
    } catch (error) {
      errorMessage = DioExceptionUtil.handleError(error);
    } finally {
      isLoading = false;
    }
  }

}