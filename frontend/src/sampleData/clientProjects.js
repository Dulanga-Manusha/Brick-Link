export const clientProjects = {
    "contracts": [
      {
        "id": 1,
        "title": "House Construction Project",
        "description": "Build a new residential house in downtown area.",
        "client": "John Doe",
        "budget": 100000,
        "status": "Open"
      },
      {
        "id": 2,
        "title": "Office Building Renovation",
        "description": "Renovate an existing office building with modern amenities.",
        "client": "Jane Smith",
        "budget": 50000,
        "status": "Open"
      }
    ],
    "bids": [
      {
        "id": 1,
        "contractId": 1,
        "contractor": "ABC Construction",
        "amount": 95000,
        "status": "Pending"
      },
      {
        "id": 2,
        "contractId": 1,
        "contractor": "XYZ Builders",
        "amount": 98000,
        "status": "Accepted"
      },
      {
        "id": 3,
        "contractId": 2,
        "contractor": "PQR Renovations",
        "amount": 48000,
        "status": "Pending"
      }
    ]
  };