class ScreenArguments<T> {
  final String? key;
  final T? value;
  ScreenArguments({this.key, this.value});
}

class ScreenArgumentKeys {
  ScreenArgumentKeys._();
  static const String bookingId = 'booking_id';
}