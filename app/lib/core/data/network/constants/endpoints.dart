class Endpoints {
  Endpoints._();

  // base url
  static const String baseUrl = "https://member-api.develop.happy545.com";
  static const String baseMemberUrl = 'http://laos_member_api.playground.gpexdev.com/v1/pos';

  // receiveTimeout
  static const int receiveTimeout = 15000;

  // connectTimeout
  static const int connectionTimeout = 30000;

  //
  static const String getFaqs = baseUrl + "/v1/faq/list?pageRows=10&pageNumber=1&languageType=EN";
  static const String salesDraw = '$baseMemberUrl/sales-history/draw';


  // Account
  static const String login = '$baseMemberUrl/login';
  static const String myInfo = '$baseMemberUrl/my-info';
  static const String resetPassword = '$baseMemberUrl/reset-password';

  //Game
  static const String drawResults = '$baseMemberUrl/draw-results';
  static const String prizePayout = '$baseMemberUrl/prize-payout';
  static String gameDraw(String gameIndex) => '$baseMemberUrl/game/$gameIndex';
  static const String saleHistoryDraw = '$baseMemberUrl/sales-history/draw';
  static String saleHistoryDrawDetail(String drawIdx) => '$baseMemberUrl/sales-history/draw/$drawIdx';
  static const String winningDraw = '$baseMemberUrl/winning-draw';
  static String qrScanResults(String ticketIdx) => '$baseMemberUrl/qr-scan/results/$ticketIdx';
  static String ticketPayout(String ticketIdx) => '$baseMemberUrl/qr-scan/results/payout/$ticketIdx';

  //Ticket
  static const String buyTicket = '$baseMemberUrl/ticket/buy';
  static const String winningTickets = '$baseMemberUrl/winning-ticket';
  static const String cancelTicketReason = '$baseMemberUrl/cancel-ticket/reason';
  static const String cancelTicket = '$baseMemberUrl/cancel-ticket';
  static String ticketDetail(String ticketIdx) => '$baseMemberUrl/ticket/$ticketIdx';

}