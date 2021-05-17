var Observer;
(function (Observer) {
    class ConcreteSubject {
        constructor() {
            this._observers = [];
        }
        attach(observer) {
            const isExist = this._observers.indexOf(observer) > -1;
            if (isExist) {
                return console.log('Subject: Observer has been attached already.');
            }
            console.log('Subject: Attached an observer.');
            this._observers.push(observer);
        }
        detach(observer) {
            const observerIndex = this._observers.indexOf(observer);
            if (observerIndex < 0) {
                return console.log('Subject: Nonexistent observer.');
            }
            this._observers.splice(observerIndex, 1);
            console.log('Subject: Detached an observer.');
        }
        notify() {
            console.log(`Subject: Notifying observers...`);
            for (const observer of this._observers) {
                observer.update(this);
            }
        }
        someBusinessLogic() {
            console.log('\nSubject: I\'m doing something important.');
            this.state = Math.floor(Math.random() * (10 + 1));
            console.log(`Subject: My state has just changed to: ${this.state}`);
            this.notify();
        }
    }
    class ConcreteObserverA {
        update(subject) {
            if (subject instanceof ConcreteSubject && subject.state < 3) {
                console.log('ConcreteObserverA: Reacted to the event.');
            }
        }
    }
    class ConcreteObserverB {
        update(subject) {
            if (subject instanceof ConcreteSubject && (subject.state === 0 || subject.state >= 2)) {
                console.log('ConcreteObserverB: Reacted to the event.');
            }
        }
    }
    const subject = new ConcreteSubject();
    const observerA = new ConcreteObserverA();
    subject.attach(observerA);
    const observerB = new ConcreteObserverB();
    subject.attach(observerB);
    subject.someBusinessLogic();
    subject.someBusinessLogic();
    subject.detach(observerB);
    subject.someBusinessLogic();
})(Observer || (Observer = {}));
//# sourceMappingURL=observer.js.map