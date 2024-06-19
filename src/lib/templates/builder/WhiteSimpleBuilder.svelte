<script lang="ts">
    import Signature from "$lib/components/inputs/Signature.svelte";
    import { CurrencyEnum } from "../../../enums";
    import type { IBasicInvoiceData } from "../../../types/types";

  const demoData: IBasicInvoiceData = {
    logo: 'https://via.placeholder.com/150',
    logoText: 'MyCompany',
    issuer: {
      name: 'John Doe',
      contactInfo: {
        address: '123 Main St, Anytown USA',
        phoneNumber: '555-1234',
        emailAddress: 'john@mycompany.com'
      }
    },
    billTo: {
      name: 'Jane Doe',
      contactInfo: {
        address: '456 Oak Rd, Someplace CA',
        phoneNumber: '555-5678',
        emailAddress: 'jane@client.com'
      }
    },
    invoiceData: {
      invoiceNumber: '1234',
      date: new Date('2023-05-15'),
      items: [
        {
          description: 'Product A',
          quantity: 2,
          price: 10.99,
          amount: 21.98,
          saved: false
        },
        {
          description: 'Service B',
          quantity: 1,
          price: 50.00,
          amount: 50.00,
          saved: true
        },
        {
          description: 'Discount C',
          quantity: 1,
          price: -5.00,
          amount: -5.00,
          saved: true
        }
      ]
    },
    accountDetails: 'Bank Account: 12345678',
    currency: CurrencyEnum.UnitedStates,
    signature: [],
    total: 66.98,
    subTotal: 71.98,
    discount: 5.00,
    footerText: 'Thank you for your business!',
    tax: 0,
    templateInUse: 'template-a',
    borderColor: 'green'
  }

</script>

<main class="w-[210mm] h-[297mm] p-4 border" style={}>
    
</main>