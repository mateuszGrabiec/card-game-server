const lodash = require("lodash");
const { before } = require("lodash");
module.exports = class Table {
    constructor() {
        this.table = Array(4).fill([]);
        this.pointsOnLane = Array(4).fill(0);
    }

    putCard(clientData) {
        let fieldId = clientData.fieldId;
        const card = clientData.card
        //-- becouse index on front must be >=1
        --fieldId
        try {
            if (this.table[fieldId].length > 0) {
                this.table[fieldId].push(card);
                this.table[fieldId] = this.sortCardOnLine(this.table[fieldId]);
                this.updatePostionOnLines(clientData.field);
            }
            else {
                this.table[fieldId] = [card]
                this.updatePostionOnLines(clientData.field)
            }
        } catch (err) {
            console.log(err)
        }
    }

    sortCardOnLine(line) {
        return lodash.sortBy(line, ['x']);
    }

    updatePostionOnLines(field) {
        this.table.map((line) => {
            line.map((card, numOnLine) => {
                const first = field.width / 2 - card.width * line.length / 2
                card.x = field.x + first + numOnLine * card.width;
                card.y = field.y;
            })
        })
    }

}