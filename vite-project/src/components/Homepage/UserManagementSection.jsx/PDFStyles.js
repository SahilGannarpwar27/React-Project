export const PDFstyles = {
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  section: {
    margin: 5,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  // User information styling - full width
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 0,
  },
  userImageContainer: {
    width: 70,
    height: 70,
    overflow: 'hidden',
    marginRight: 20,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  userDetails: {},
  // Chart image styling
  chartContainer: {
    width: '100%',
    marginVertical: 15,
    alignItems: 'center',
  },
  chartImage: {
    width: '100%', // Changed to 100% for full width
  },
  // Performance card styling
  performanceSection: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fafafa',
  },
  performanceItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    paddingVertical: 6,
    marginBottom: 3,
  },
  performanceLabel: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
  },
  performanceValue: {
    flex: 1,
    fontSize: 11,
    textAlign: 'right',
  },
  // Table styling - reduced size
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 0.5,
    marginTop: 15,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellHeader: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 0.5,
    padding: 4,
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    fontSize: 10,
  },
  tableCell: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 0.5,
    padding: 4,
    fontSize: 9,
  },
  subRow: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
  },
  subCell: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 0.5,
    padding: 3,
    fontSize: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 11,
    marginBottom: 4,
  },
  courseProgressSection: {
    marginVertical: 10,
  },
  courseProgressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  courseProgressName: {
    flex: 2,
    fontSize: 11,
  },
  courseProgressValue: {
    flex: 1,
    fontSize: 11,
  },
}
