# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Add Custom Agent IDs to Facilities

#### Description:
Currently, the system uses internal database ID for Agents in the reports generated for Facilities.
We need to enhance the system to allow Facilities to save their own custom IDs for the Agents they work with.
So these new custom IDs will be used in the reports instead of internal database IDs.

#### Acceptance Criteria:
- Facilities can add, edit, and delete custom IDs for Agents.
- Custom Id field is added to the Facility-Agent mapping in the database
- Custom Ids are unique within each Facility.
- Custom ID is used in the report generation process instead of the internal database ID.

#### Time Estimages:

1.5 Day: 
Database Changes(2 hours) + Backend Changes(4 hours) + Frontend Changes(4 hours) + Testing and Bug Fixing(2)

#### Implementation Details
1. Add new field `customId` to the Facitily-Agent mapping table schema. (database)
2. Update Facility-Agent mapping API endpoints to handle CRUD operations for custom IDs.
3. Modify the report generation logic to use the custom ID instead of the inernal database ID.
4. Implement UI functionality for Facilities to add, edit, and delete custom IDs.



### Ticket 2: Update how we get all Shifts with Metadata. (`GetShiftsByFacility`)

#### Description:
Currently, `getShiftsByFacility` function is returning shifts for Facility, including some metadata about the assigned agent.
We need to update this function to include the custom ID of the Agent in the returned Shifts.

#### Acceptance Criteria:
- `getShiftsByFacility` function returns Shifts with the custom ID of the assigned agent.
- Ensure custom ID is included in the Shift metadata object

#### Time Estimate:

0.5 day: 
Backend Changes (3 hours) + Testing (1 hour)

#### Implementation Details:

1. Modify the `getShiftsByFacility` function to include custom ID field from the Facility-Agent mapping in the Shift metadata.
2. Update the data retrieval query to fetch the custom ID along with other metadata for each Shift.

### Ticket 3: Update Report Generation. (`generateReport`)

#### Description
Currently, the `generateReport` function generates reports using the internal database ID of Agents.
We need to update this function to use the custom ID for each Agent that is provided by the Facility.

#### Acceptance Criteria:

- `generateReport` function uses custom ID of Agents in the report generation process.
- Custom ID is displayed in the generated PDF reports.

#### Effort Estimate:

1 day: 
Backend changes (4 hours) + Frontend changes (2 hours) + Testing (1 hour)

#### Implementation Details:

1. Modify `generateReport` function to retrieve the custom ID for each Agent assigned to Shifts.
2. Update report generation logic to use the custom ID instead of the internal database ID when generating the PDF report.
3. Update report template to display the custom ID field.
