export type Order = {
    items: any;
    orderId: number; 
    date: string;
    customerName: string; 
    email: string; 
    phone: string; 
    total: number; 
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled'; 
    invoice: {
      asset: {
        url: string; 
      };
    }; 
    userID: string;  
  }
  