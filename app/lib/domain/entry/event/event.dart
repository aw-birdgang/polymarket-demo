class Event {
  String title;
  String imageUrl;
  String volume;
  double chance;
  bool isTrending;

  Event({
    required this.title,
    required this.imageUrl,
    required this.volume,
    required this.chance,
    required this.isTrending,
  });

  factory Event.fromJson(Map<String, dynamic> json) {
    return Event(
      title: json['title'] ?? 'Untitled Event',          // 🔥 기본값 추가
      imageUrl: json['imageUrl'] ?? 'https://via.placeholder.com/150',
      volume: json['volume'] ?? '\$0 Vol.',              // 🔥 기본값 추가
      chance: (json['chance'] ?? 0).toDouble(),          // 🔥 double 변환
      isTrending: json['isTrending'] ?? false,           // 🔥 bool 기본값
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'imageUrl': imageUrl,
      'volume': volume,
      'chance': chance,
      'isTrending': isTrending,
    };
  }

}