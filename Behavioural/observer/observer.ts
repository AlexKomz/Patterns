namespace Observer {
    interface Subject {
        attach(observer: Observer): void;
        detach(observer: Observer): void;
        notify(): void;
    }

    interface Observer {
        update(subject: Subject): void;
    }


    class ConcreteSubject implements Subject {
        private _observers: Observer[] = [];

        public state: number;

        public attach(observer: Observer): void {
            const isExist = this._observers.indexOf(observer) > -1;
            if (isExist) {
                return console.log('Subject: Observer has been attached already.');
            }

            console.log('Subject: Attached an observer.');
            this._observers.push(observer);
        }

        public detach(observer: Observer): void {
            const observerIndex = this._observers.indexOf(observer);
            if (observerIndex < 0) {
                return console.log('Subject: Nonexistent observer.');
            }

            this._observers.splice(observerIndex, 1);
            console.log('Subject: Detached an observer.');
        }

        public notify(): void {
            console.log(`Subject: Notifying observers...`);
            for (const observer of this._observers) {
                observer.update(this);
            }
        }

        public someBusinessLogic(): void {
            console.log('\nSubject: I\'m doing something important.');
            this.state = Math.floor(Math.random() * (10 + 1));

            console.log(`Subject: My state has just changed to: ${this.state}`);
            this.notify();
        }
    }

    class ConcreteObserverA implements Observer {
        public update(subject: Subject): void {
            if (subject instanceof ConcreteSubject && subject.state < 3) {
                console.log('ConcreteObserverA: Reacted to the event.');
            }
        }
    }

    class ConcreteObserverB implements Observer {
        public update(subject: Subject): void {
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
}
