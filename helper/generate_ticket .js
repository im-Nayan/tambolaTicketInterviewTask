exports.ticket = async (oldTicketData) => {
    try {
        function randomNumber(minNum, maxNum, count) {
            let numbers = [];

            while (numbers.length < count) {
                let ticketNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
                
                // if(!oldTicketData.includes(ticketNum)){
                    // console.log(ticketNum,'nummmmmmm');
                if (ticketNum > maxNum) {
                    numbers.push(0)
                } else {
                    if (!numbers.includes(ticketNum)) {
                        numbers.push(ticketNum)
                    }
                // }
            }
            };
            console.log(numbers ,'numbersssssssssss');
            if (!numbers.includes(0)) {
                numbers = numbers.sort((a, b) => a - b)
            }


            return numbers;

        };

        let ticketCol1 = randomNumber(1, 9, 3),
            ticketCol2 = randomNumber(10, 19, 3),
            ticketCol3 = randomNumber(20, 29, 3),
            ticketCol4 = randomNumber(30, 39, 3),
            ticketCol5 = randomNumber(40, 49, 3),
            ticketCol6 = randomNumber(50, 59, 3),
            ticketCol7 = randomNumber(60, 69, 3),
            ticketCol8 = randomNumber(70, 79, 3),
            ticketCol9 = randomNumber(80, 90, 3);
        let ticket = [];
        for (let i = 0; i < 3; i++) {
            let row = [
                ticketCol1[i],
                ticketCol2[i],
                ticketCol3[i],
                ticketCol4[i],
                ticketCol5[i],
                ticketCol6[i],
                ticketCol7[i],
                ticketCol8[i],
                ticketCol9[i],
            ];
            ticket.push(row);
        };
        // console.log(ticket,'ticket');
        //For 4 Zeros

        for (let i = 0; i < 3; i++) {
            let totalZero = 0;

            while (totalZero < 4) {

                let randomIndex = Math.floor(Math.random() * 8) + 1;
                if (ticket[i][randomIndex] != 0) {
                    let index1 = 0;
                    let index2 = 0;
                    if (i == 0) {
                        index1 = 1;
                        index2 = 2
                    } else if (i == 1) {
                        index1 = 0;
                        index2 = 2;
                    } else {
                        index1 = 0
                        index2 = 1;
                    };
                    if (!(ticket[index1][randomIndex] === 0 && ticket[index2][randomIndex] === 0)) {
                        ticket[i][randomIndex] = 0;
                        totalZero = totalZero + 1;
                    }
                }


            };
        };
        console.log(ticket);
        return ticket;
    } catch (error) {
        console.log(error);
        throw error;
    }
}