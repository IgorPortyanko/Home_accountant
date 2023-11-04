import { transactionItemIF } from "../../models/models";
import { periodFormIF } from "./PeriodModal";

export const sortDataOfDate = (data: transactionItemIF[]) => {
    data.sort((a: transactionItemIF, b: transactionItemIF) => {
        const dateA = new Date(a.date); 
        const dateB = new Date(b.date);

        if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
          return 0;
        }) 
    return data     
}


export const selectItemForPeriod = (data: periodFormIF, allTransaction: transactionItemIF[]) => {
  const dateA = new Date(data.firstDate); 
  const dateB = new Date(data.secondDate);
  
  const filteredItems = allTransaction.filter((elem) => {
    const itemDate = new Date(elem.date);
    return itemDate >= dateA && itemDate <= dateB;
  });

  return filteredItems;
}
