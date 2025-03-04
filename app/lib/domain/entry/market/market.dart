class Comment {
  String id;
  String question;
  DateTime endTime;
  bool resolved;
  bool outcome;

  Comment({
    required this.id,
    required this.question,
    required this.endTime,
    required this.resolved,
    required this.outcome,
  });

  factory Comment.fromJson(Map<String, dynamic> json) {
    return Market(
      id: json['id'] ?? '',  // 🔥 String 기본값
      question: json['question'] ?? 'No question available',  // 🔥 기본값 추가
      endTime: json['endTime'] != null
          ? DateTime.parse(json['endTime'])
          : DateTime.now(),  // 🔥 null 방어 코드
      resolved: json['resolved'] ?? false,  // 🔥 bool 기본값
      outcome: json['outcome'] ?? false,    // 🔥 bool 기본값
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'question': question,
      'endTime': endTime.toIso8601String(),
      'resolved': resolved,
      'outcome': outcome,
    };
  }

}
