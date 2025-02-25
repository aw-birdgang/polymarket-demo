import 'package:http/http.dart';
import 'package:web3dart/web3dart.dart';
import '../../../config/env.dart';

class EthersClient {
  static final Web3Client _client = Web3Client(
    'https://sepolia.infura.io/v3/${Env.infuraKey}',
    Client(),
  );

  static Web3Client get client => _client;
}