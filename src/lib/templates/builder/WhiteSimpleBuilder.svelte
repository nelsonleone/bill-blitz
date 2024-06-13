<script lang="ts">
    
    const demoInvoiceData = {
  logo: "https://via.placeholder.com/150",
  logoText: "ABC Company",
  issuer: {
    name: "ABC Company",
    contactInfo: {
      phoneNumber: "+1 (123) 456-7890",
      emailAddress: "info@abccompany.com"
    }
  },
  billTo: {
    name: "John Doe",
    contactInfo: {
      phoneNumber: "+1 (987) 654-3210",
      emailAddress: "john.doe@example.com"
    }
  },
  invoiceData: {
    invoiceNumber: 12345,
    date: new Date("2024-06-13"),
    items: [
      {
        description: "Consulting Services",
        quantity: 20,
        price: "$50.00",
        amount: "$1,000.00",
        saved: false
      },
      {
        description: "Website Design",
        quantity: 1,
        price: "$2,500.00",
        amount: "$2,500.00",
        saved: true
      },
      {
        description: "Hosting Services (3 months)",
        quantity: 1,
        price: "$150.00",
        amount: "$450.00",
        saved: false
      }
    ]
  },
  accountDetails: {
    included: true,
    account: "12345-67890"
  },
  signatureInfo: {
    included: true,
    signatureI: "https://via.placeholder.com/100x50"
  }

  }

</script>

<main>
    
</main>