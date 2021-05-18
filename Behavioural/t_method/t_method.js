var TemplateMethod;
(function (TemplateMethod) {
    class DataЕxtraction {
        templateMethod(object) {
            const data = this.extractData(object);
            const dataString = this.convertData(data);
            return this.stringToArray(dataString);
        }
        convertData(data) {
            return `` + data;
        }
        stringToArray(string) {
            return string.split(``);
        }
    }
    class ExtractionFromArray extends DataЕxtraction {
        extractData(array) {
            return array.reduce((prev, curr) => prev + curr, 0);
        }
    }
    class ExtractionFromObject extends DataЕxtraction {
        extractData(object) {
            return Object.keys(object).reduce((prev, curr) => prev + object[curr], 0);
        }
    }
    const arr = [1, 2, 3, 4, 5, 100];
    const object = { one: 1, two: 2, three: 3, four: 4, five: 5, aHundred: 100 };
    console.log(new ExtractionFromArray().templateMethod(arr));
    console.log(new ExtractionFromObject().templateMethod(object));
})(TemplateMethod || (TemplateMethod = {}));
//# sourceMappingURL=t_method.js.map