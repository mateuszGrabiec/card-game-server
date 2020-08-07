module.exports = class Table {
    constructor() {
        this.table = Array(4).fill([]);
    }

    putCard(clientData) {
        let { dragItemId, fieldId } = clientData;
        //-- becouse index on front must be >=1
        if (this.table[--fieldId]) { 
            this.table[fieldId].push(dragItemId);
        }
        else {
            this.table[fieldId] = [dragItemId]
        }
    }


}