import {useNavigate} from '@shopify/hydrogen';
import {useEffect} from 'react';

// Component which shows success message and redirects back to account page
export function Success() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate('/account'), 2000);
  }, []);

  return (
    <p className="font-bold text-4xl">
      Product added successfully. Please wait for the product to be approved.
    </p>
  );
}
