import 'package:flutter_dotenv/flutter_dotenv.dart';

class Env {
  static String get infuraKey => dotenv.env['REACT_APP_INFURA_KEY'] ?? '';
  static String get privateKey => dotenv.env['DEPLOYER_PRIVATE_KEY'] ?? '';
  static String get marketAddress => dotenv.env['PREDICTION_MARKET_ADDRESS'] ?? '';
}