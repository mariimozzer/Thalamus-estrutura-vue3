export default class WebSocketService {
    constructor() {
      this.ws = new WebSocket('ws://192.168.0.6:8081');
      this.listeners = [];
      this.initialize();
    }
  
    initialize() {
      this.ws.addEventListener('open', () => {
        console.log('WebSocket connected');
      });
  
      this.ws.addEventListener('message', (event) => {
        this.notifyAll(event);
      });
  
    }
  
    addListener(callback) {
      this.listeners.push(callback);
    }
  
    removeListener(callback) {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    }
  
    notifyAll(event) {
      this.listeners.forEach(listener => listener(event));
    }
  
    send(message) {
      this.ws.send(message);
    }
  
    close() {
      this.ws.close();
    }
  }