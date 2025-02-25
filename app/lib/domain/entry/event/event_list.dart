import 'event.dart';

class EventList {
  final List<Event> events;
  final bool hasNextPage;

  EventList({
    required this.events,
    required this.hasNextPage,
  });

  /// 🔥 JSON → EventList 객체로 변환
  factory EventList.fromJson(Map<String, dynamic> json) {
    List<Event> events = (json['data'] as List)
        .map((event) => Event.fromJson(event))
        .toList();

    return EventList(
      events: events,
      hasNextPage: json['hasNextPage'] ?? false,
    );
  }

  /// 🔥 EventList 객체 → JSON 변환
  Map<String, dynamic> toJson() {
    return {
      'data': events.map((event) => event.toJson()).toList(),
      'hasNextPage': hasNextPage,
    };
  }
}