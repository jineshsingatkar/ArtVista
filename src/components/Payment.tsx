import { useState } from 'react';
import { createPayment } from '../services/paymentService';
import { toast } from 'react-hot-toast';

interface PaymentProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: any) => void;
}

const Payment = ({ amount, onSuccess, onError }: PaymentProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // Create a payment order
      const order = await createPayment(amount);
      
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: 'ArtVista',
          description: 'Art Purchase',
          order_id: order.id,
          handler: function (response: any) {
            if (response.razorpay_payment_id) {
              onSuccess(response.razorpay_payment_id);
            } else {
              onError('Payment failed');
            }
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '9999999999',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment');
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {isLoading ? 'Processing...' : `Pay ₹${amount}`}
      </button>
    </div>
  );
};

export default Payment; 