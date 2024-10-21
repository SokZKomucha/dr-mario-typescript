
type EventCallback<T extends any> = (callback: T) => void;

export class EventEmitter<EventMap extends Record<string, any>> {
  private eventListeners: { [K in keyof EventMap]?: Set<EventCallback<EventMap[K]>> } = {};

  public on<K extends keyof EventMap>(eventType: K, eventCallback: EventCallback<EventMap[K]>) {
    const listeners = this.eventListeners[eventType] ?? new Set();
    listeners.add(eventCallback);
    this.eventListeners[eventType] = listeners;
  }

  public emit<K extends keyof EventMap>(eventType: K, payload: EventMap[K]) {
    const listeners = this.eventListeners[eventType] ?? new Set();
    listeners.forEach(e => e(payload));
  }
}