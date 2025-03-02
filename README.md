# Case Monks

## About the Project

This project is a filtering system that allows users to apply filters as needed. After applying the filters, the results are displayed in the "Results" tab of the Google Sheets spreadsheet.

## Spreadsheet Link
[Google Spreadsheet](https://docs.google.com/spreadsheets/d/1HvhEgpobk5xg7CecbAxZsLB7IKSS3ef6ZDIT87N9bME/edit?usp=sharing)

## Implemented Features

- **Filtering**: Users can filter products by price, color, size, and gender. Filters can be combined for greater precision.
- **Dynamic select items**: The items in the "color" and "size" selects are dynamically fetched from the spreadsheet, ensuring that only available data is displayed.
- **Processing status**: Status messages inform the user when data rendering is in progress and when it has been completed.

## How It Works

1. The front-end displays a form where users enter the desired filtering criteria.
2. Upon submission, a request is sent to `getFilteredProducts`, passing the selected filters as arguments.
3. The `filterProducts` function processes the data, filtering only the rows that match the selected criteria.
4. The filtered results are stored in the "Results" tab of the spreadsheet.
5. The operation status updates dynamically to indicate the progress of the filtering.

## Code Structure

```
case_monks/
├── Code.gs      # Contains all filtering logic and spreadsheet manipulation
└── page.html    # Contains the user interface and interacts with the Apps Script code
└── README.md    # Documentation for the project
```

### **Code Breakdown**

#### `doGet()`
- Reads the "Products" sheet from the spreadsheet and extracts unique values for the "COLOR" and "SIZE" columns.
- Dynamically populates the front-end select inputs to ensure only available values are displayed.
- Returns an HTML template for rendering the user interface.

#### `filterProducts(filters)`
- Reads data from the "Products" sheet and applies the user-selected filters.
- Filters data based on:
  - Price range
  - Selected color
  - Selected size
  - Selected gender
- Stores the filtered results in the "Results" tab.

#### `getFilteredProducts(filtersJson)`
- Converts the received filters from JSON into a JavaScript object.
- Calls `filterProducts` to retrieve the matching products.
- Returns the filtered results in JSON format.

## Maintenance

To ensure the system functions correctly, it is recommended to:
- **Validate data**: Ensure the spreadsheet data is correctly formatted to avoid filtering errors.
- **Update spreadsheet structure**: If column names change, the functions should be updated accordingly.
- **Optimize performance**: If data volume increases significantly, filtering optimization may be required for efficiency.
- **Perform regular testing**: Run tests after any modifications to prevent processing failures.



