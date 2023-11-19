import React from 'react';

const Help = () => {
  return (
    <div>
      <h2>Help Center</h2>
      <p>
        Welcome to our Help Center. If you have any questions or issues, please check the following
        information or contact our support team.
      </p>
      <h3>Frequently Asked Questions (FAQs)</h3>
      <ul>
        <li>How to use the Point of Sale system?</li>
        <li>What payment methods are supported?</li>
        {/* FAQs */}
      </ul>
      <h3>Contact Support</h3>
      <p>
        If you couldn't find the information you need, feel free to contact our support team at{' '}
        <a href="mailto:support@example.com">support@example.com</a>.
      </p>
    </div>
  );
};

export default Help;
