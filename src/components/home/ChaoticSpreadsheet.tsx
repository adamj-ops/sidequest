import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { 
  AlertCircle, 
  Clock, 
  Filter, 
  Search, 
  AlertTriangle,
  HelpCircle,
  X,
  ChevronDown,
  ChevronRight,
  Edit3,
  Menu,
  Bell
} from 'lucide-react';

// Define cell data types
interface CellData {
  value: string;
  type: string;
  class: string;
  hasComment: boolean;
  commentText: string;
  hasNotification?: boolean;
  notificationText?: string;
  notificationUrgent?: boolean;
}

// Use proper types
type Cell = string | CellData;
type Row = Cell[];
type SpreadsheetData = Row[];

// Utility function to generate random spreadsheet data
const generateCellData = (rows: number, cols: number, tabId: string): SpreadsheetData => {
  const cellTypes = [
    'text', 'number', 'date', 'formula', 'empty', 'error', 'highlighted'
  ];
  
  const highlightColors = [
    'highlighted-red', 'highlighted-green', 'highlighted-yellow', 'highlighted-blue'
  ];
  
  // Generate appropriate column headers based on tab type
  const headerRow: Row = [''];
  
  if (tabId === 'projects') {
    headerRow.push('Project Name', 'Client', 'Status', 'Start Date', 'Deadline', 'Budget', 'Owner', 'Priority', 'Completion');
  } 
  else if (tabId === 'tasks') {
    headerRow.push('Task', 'Assignee', 'Due Date', 'Priority', 'Status', 'Hours Est.', 'Hours Actual', 'Related Project');
  }
  else if (tabId === 'content') {
    headerRow.push('Content Title', 'Type', 'Assigned To', 'Status', 'Due Date', 'Review Status', 'Link', 'Keywords', 'Notes', 'Platform');
  }
  else if (tabId === 'deadlines') {
    headerRow.push('Item', 'Responsible', 'Due Date', 'Priority', 'Status', 'Notes', 'Days Left');
  }
  else {
    // Default fallback - use column letters
    for (let i = 1; i < cols; i++) {
      headerRow.push(String.fromCharCode(64 + i));
    }
  }
  
  const cells: SpreadsheetData = [headerRow];
  
  // Generate data rows with appropriate content for each tab type
  for (let i = 1; i < rows; i++) {
    const row: Row = [i.toString()]; // Row number
    
    for (let j = 1; j < headerRow.length; j++) {
      // Get the column header to determine what kind of data to generate
      const columnHeader = headerRow[j];
      const headerText = typeof columnHeader === 'string' ? columnHeader : columnHeader.value;
      
      // Randomly select cell type with weighted probabilities based on column
      let cellType = determineCellType(headerText, tabId);
      
      let cellValue = '';
      let cellClass = '';
      let hasComment = Math.random() < 0.08; // 8% chance of having a comment
      let hasNotification = Math.random() < 0.05; // 5% chance of having a notification
      let notificationUrgent = Math.random() < 0.5; // 50% chance notification is urgent
      let commentText = '';
      let notificationText = '';
      
      // Generate value based on cell type and column header
      switch(cellType) {
        case 'text':
          cellValue = generateTextForColumn(headerText, tabId);
          break;
          
        case 'number':
          cellValue = generateNumberForColumn(headerText, tabId);
          break;
          
        case 'date':
          cellValue = generateDateForColumn(headerText, tabId);
          break;
          
        case 'formula':
          cellValue = generateFormulaForColumn(headerText, tabId);
          cellClass = 'formula';
          break;
          
        case 'error':
          cellValue = generateErrorForColumn();
          cellClass = 'error';
          break;
          
        case 'highlighted':
          cellValue = generateHighlightedForColumn(headerText, tabId);
          cellClass = highlightColors[Math.floor(Math.random() * highlightColors.length)];
          break;
          
        case 'empty':
        default:
          cellValue = '';
      }
      
      // Generate comments - more specific to business context
      if (hasComment) {
        commentText = generateCommentForColumn(headerText, tabId, cellValue);
      }
      
      // Generate notifications - more specific to business context
      if (hasNotification) {
        notificationText = generateNotificationForColumn(headerText, tabId, cellValue);
      }
      
      row.push({
        value: cellValue,
        type: cellType,
        class: cellClass,
        hasComment,
        commentText,
        hasNotification,
        notificationText,
        notificationUrgent
      });
    }
    
    cells.push(row);
  }
  
  return cells;
};

// Helper function to determine cell type based on column header
const determineCellType = (columnHeader: string, tabId: string): string => {
  const cellTypes = ['text', 'number', 'date', 'formula', 'empty', 'error', 'highlighted'];
  
  // Date columns should mostly be dates
  if (columnHeader.includes('Date') || columnHeader === 'Deadline' || columnHeader === 'Due Date') {
    return Math.random() < 0.85 ? 'date' : (Math.random() < 0.5 ? 'text' : 'error');
  }
  
  // Status columns should mostly be text with highlighting
  if (columnHeader === 'Status' || columnHeader === 'Priority' || columnHeader === 'Review Status') {
    return Math.random() < 0.6 ? 'highlighted' : 'text';
  }
  
  // Budget, hours, or completion columns should be numbers or formulas
  if (columnHeader === 'Budget' || columnHeader.includes('Hours') || columnHeader === 'Completion' || columnHeader === 'Days Left') {
    return Math.random() < 0.5 ? 'number' : (Math.random() < 0.3 ? 'formula' : (Math.random() < 0.3 ? 'error' : 'text'));
  }
  
  // Other columns get a more random distribution
  const weights = [0.4, 0.15, 0.15, 0.1, 0.05, 0.05, 0.1]; // text, number, date, formula, empty, error, highlighted
  const randomValue = Math.random();
  let cumulative = 0;
  
  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (randomValue < cumulative) {
      return cellTypes[i];
    }
  }
  
  return 'text'; // default
};

// Helper function to generate text content for specific columns
const generateTextForColumn = (columnHeader: string, tabId: string): string => {
  if (columnHeader === 'Project Name' || columnHeader === 'Content Title' || columnHeader === 'Item') {
    const projects = [
      "Website Redesign", "Mobile App Development", "Brand Refresh", 
      "Marketing Campaign", "Data Migration", "CRM Implementation", 
      "Annual Report", "Product Launch", "Customer Portal", "Onboarding System",
      "Social Media Strategy", "SEO Optimization", "Email Newsletter", 
      "Content Calendar", "Brand Guidelines", "User Research",
      "Competitive Analysis", "Market Research", "Sales Deck", "Training Materials"
    ];
    return projects[Math.floor(Math.random() * projects.length)];
  }
  
  if (columnHeader === 'Client') {
    const clients = [
      "Acme Inc.", "TechCorp", "Global Solutions", "Innovative Partners", 
      "Bright Future Ltd.", "Next Level Co.", "Forward Thinking", "Smart Systems", 
      "Modern Enterprises", "Digital Ventures", "ABC Corporation", "XYZ Dynamics"
    ];
    return clients[Math.floor(Math.random() * clients.length)];
  }
  
  if (columnHeader === 'Status' || columnHeader === 'Review Status') {
    const statuses = [
      "Not Started", "In Progress", "On Hold", "Waiting for Review", 
      "Completed", "Delayed", "Pending Approval", "Approved", "Rejected", 
      "Needs Revision", "Draft", "Published", "Archived", "Cancelled"
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }
  
  if (columnHeader === 'Owner' || columnHeader === 'Assignee' || columnHeader === 'Assigned To' || columnHeader === 'Responsible') {
    const people = [
      "John Smith", "Sarah Johnson", "Michael Lee", "Emma Wilson", 
      "David Chen", "Jessica Brown", "Robert Garcia", "Maria Rodriguez", 
      "James Kim", "Lisa Anderson", "Thomas Moore", "Sofia Patel", 
      "unassigned", "multiple??", "see notes", "NEEDS ASSIGNMENT"
    ];
    return people[Math.floor(Math.random() * people.length)];
  }
  
  if (columnHeader === 'Priority') {
    const priorities = ["High", "Medium", "Low", "Critical", "Urgent", "P1", "P2", "P3", "P0", "1-NOW", "2-Soon", "3-Later"];
    return priorities[Math.floor(Math.random() * priorities.length)];
  }
  
  if (columnHeader === 'Type') {
    const types = ["Blog Post", "White Paper", "Case Study", "Social Media", "Infographic", "Video", "Email", "Landing Page", "Ad Copy", "Press Release"];
    return types[Math.floor(Math.random() * types.length)];
  }
  
  if (columnHeader === 'Notes') {
    const notes = [
      "Waiting for client feedback", "To be discussed in next meeting", 
      "Blocked by technical issues", "Needs stakeholder approval", 
      "Dependencies with Project X", "Final version", "Needs revision", 
      "Draft only", "Please review ASAP", "Discuss with marketing", 
      "", "See email thread", "Check Slack channel", "Ask manager"
    ];
    return notes[Math.floor(Math.random() * notes.length)];
  }
  
  if (columnHeader === 'Platform') {
    const platforms = ["Website", "Instagram", "LinkedIn", "Twitter", "Facebook", "YouTube", "Newsletter", "Blog", "All Platforms", "TikTok"];
    return platforms[Math.floor(Math.random() * platforms.length)];
  }
  
  if (columnHeader === 'Related Project') {
    const projects = ["Website Redesign", "Q2 Marketing", "Client Onboarding", "New Product", "Annual Campaign", "N/A", "All", "TBD", "?"];
    return projects[Math.floor(Math.random() * projects.length)];
  }
  
  if (columnHeader === 'Link') {
    const links = [
      "https://drive.google.com/file...", 
      "https://www.dropbox.com/...", 
      "See Email", 
      "https://www.notion.so/...", 
      "FILE PATH INCORRECT",
      "LINK BROKEN",
      "bit.ly/2xYz...",
      "",
      "ask Sarah for link",
      "in shared drive folder"
    ];
    return links[Math.floor(Math.random() * links.length)];
  }
  
  if (columnHeader === 'Keywords') {
    const keywords = [
      "innovation, technology", 
      "growth, sales, revenue", 
      "customer, experience, service", 
      "efficiency, productivity", 
      "leadership, management", 
      "TBD",
      "N/A",
      "strategy, planning, goals",
      "SEO, digital, marketing"
    ];
    return keywords[Math.floor(Math.random() * keywords.length)];
  }
  
  // Default case - random string
  const defaultTexts = ["Refer to documentation", "See previous email", "Contact team lead", "Check shared drive", "Ask in team meeting"];
  return defaultTexts[Math.floor(Math.random() * defaultTexts.length)];
};

// Helper function to generate number content for specific columns
const generateNumberForColumn = (columnHeader: string, tabId: string): string => {
  if (columnHeader === 'Budget') {
    const value = Math.floor(Math.random() * 50000) + 5000;
    return `$${value.toLocaleString()}`;
  }
  
  if (columnHeader === 'Completion') {
    const value = Math.floor(Math.random() * 101);
    return `${value}%`;
  }
  
  if (columnHeader === 'Hours Est.' || columnHeader === 'Hours Actual') {
    const value = Math.floor(Math.random() * 80) + 2;
    return value.toString();
  }
  
  if (columnHeader === 'Days Left') {
    const value = Math.floor(Math.random() * 30) - 5; // Allow negative values
    return value.toString();
  }
  
  // Default number formatting
  const value = Math.floor(Math.random() * 1000);
  return value.toString();
};

// Helper function to generate date content for specific columns
const generateDateForColumn = (columnHeader: string, tabId: string): string => {
  // Create a date within the next 6 months
  const now = new Date();
  const futureDate = new Date();
  futureDate.setDate(now.getDate() + Math.floor(Math.random() * 180));
  
  // For start dates, use dates in the past
  if (columnHeader === 'Start Date') {
    const pastDate = new Date();
    pastDate.setDate(now.getDate() - Math.floor(Math.random() * 90));
    
    return formatDateWithVariations(pastDate);
  }
  
  // Format with deliberate inconsistency
  return formatDateWithVariations(futureDate);
};

// Formats dates in various inconsistent formats
const formatDateWithVariations = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const shortYear = year % 100;
  
  const formats = [
    `${month}/${day}/${year}`,
    `${month}/${day}/${shortYear}`,
    `${day}/${month}/${year}`,
    `${month}-${day}-${year}`,
    `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
    `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`,
    `${date.toLocaleDateString('en-US', {month: 'short'})} ${day}, ${year}`
  ];
  
  return formats[Math.floor(Math.random() * formats.length)];
};

// Helper function to generate formula content
const generateFormulaForColumn = (columnHeader: string, tabId: string): string => {
  if (columnHeader === 'Budget') {
    const formulas = [
      "=SUM(G2:G10)",
      "=AVERAGE(G2:G15)*1.1",
      "=D5*24*VLOOKUP(B5,Rates!A2:B20,2,FALSE)"
    ];
    return formulas[Math.floor(Math.random() * formulas.length)];
  }
  
  if (columnHeader === 'Completion') {
    const formulas = [
      "=COUNTA(Tasks!A:A)/B4",
      "=SUMIF(Status!A:A,\"Complete\",Status!B:B)/C7",
      "=D9/E9*100"
    ];
    return formulas[Math.floor(Math.random() * formulas.length)];
  }
  
  if (columnHeader === 'Hours Actual') {
    const formulas = [
      "=SUM(Timesheet!D5:D20)",
      "=SUMIFS(Time!B:B,Time!A:A,B6)"
    ];
    return formulas[Math.floor(Math.random() * formulas.length)];
  }
  
  if (columnHeader === 'Days Left') {
    const formulas = [
      "=NETWORKDAYS(TODAY(),E7)",
      "=(E8-TODAY())",
      "=IF(E9<TODAY(),\"OVERDUE\",E9-TODAY())"
    ];
    return formulas[Math.floor(Math.random() * formulas.length)];
  }
  
  // Default formulas
  const defaultFormulas = [
    "=SUM(A2:A10)",
    "=AVERAGE(B5:B15)",
    "=VLOOKUP(D4,Sheet2!A:C,2,FALSE)",
    "=IF(E7>TODAY(),\"Due\",\"Overdue\")",
    "=CONCATENATE(B3,\" - \",C3)",
    "=INDEX(Data!A:A,MATCH(B6,Data!B:B,0))"
  ];
  
  return defaultFormulas[Math.floor(Math.random() * defaultFormulas.length)];
};

// Helper function to generate error content
const generateErrorForColumn = (): string => {
  const errors = [
    "#VALUE!",
    "#DIV/0!",
    "#REF!",
    "#NAME?",
    "#NUM!",
    "#N/A",
    "#ERROR!",
    "#CIRCULAR!",
    "#SPILL!"
  ];
  
  return errors[Math.floor(Math.random() * errors.length)];
};

// Helper function to generate highlighted content
const generateHighlightedForColumn = (columnHeader: string, tabId: string): string => {
  if (columnHeader === 'Status') {
    const statuses = ["OVERDUE", "URGENT", "DELAYED", "COMPLETED", "ON HOLD", "BLOCKED", "CANCELLED"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }
  
  if (columnHeader === 'Priority') {
    const priorities = ["CRITICAL", "URGENT", "HIGH", "MEDIUM", "LOW"];
    return priorities[Math.floor(Math.random() * priorities.length)];
  }
  
  // Default highlighted text
  const defaultHighlighted = ["IMPORTANT", "REVIEW NEEDED", "ACTION REQUIRED", "FINAL VERSION", "SEE NOTES", "CHECK WITH TEAM"];
  return defaultHighlighted[Math.floor(Math.random() * defaultHighlighted.length)];
};

// Generate realistic comments for cells
const generateCommentForColumn = (columnHeader: string, tabId: string, cellValue: string): string => {
  if (columnHeader === 'Budget') {
    const budgetComments = [
      "This needs CFO approval",
      "Increase by 10% for Q3",
      "Does not include contingency",
      "Verify with Finance",
      "Budget freeze in effect"
    ];
    return budgetComments[Math.floor(Math.random() * budgetComments.length)];
  }
  
  if (columnHeader === 'Status' || columnHeader === 'Review Status') {
    const statusComments = [
      "Pending client feedback since 3/15",
      "Delayed due to technical issues",
      "Need to follow up with stakeholders",
      "Team capacity issues",
      "Check with David before changing"
    ];
    return statusComments[Math.floor(Math.random() * statusComments.length)];
  }
  
  if (columnHeader === 'Owner' || columnHeader === 'Assignee' || columnHeader === 'Assigned To' || columnHeader === 'Responsible') {
    const assigneeComments = [
      "Sarah is on PTO until 4/12",
      "Michael requested reassignment",
      "New hire starting next week",
      "Needs additional support",
      "Check team capacity first"
    ];
    return assigneeComments[Math.floor(Math.random() * assigneeComments.length)];
  }
  
  if (columnHeader === 'Deadline' || columnHeader === 'Due Date') {
    const dateComments = [
      "Client requested extension",
      "This is a hard deadline!",
      "May need to be pushed back",
      "Dependent on vendor delivery",
      "Agreed in last stakeholder meeting"
    ];
    return dateComments[Math.floor(Math.random() * dateComments.length)];
  }
  
  // Default comments
  const defaultComments = [
    "Check with team lead",
    "Discussed in last meeting",
    "This is incorrect - needs update",
    "See email thread from yesterday",
    "Waiting for input from marketing",
    "Ask manager before changing",
    "This is a duplicate - see row above",
    "Needs verification from client",
    "Contact Sarah for details"
  ];
  
  return defaultComments[Math.floor(Math.random() * defaultComments.length)];
};

// Generate realistic notifications for cells
const generateNotificationForColumn = (columnHeader: string, tabId: string, cellValue: string): string => {
  if (columnHeader === 'Deadline' || columnHeader === 'Due Date') {
    const dateNotifications = [
      "Due today!",
      "Overdue by 3 days",
      "Deadline approaching",
      "Extension requested",
      "Conflicts with team capacity"
    ];
    return dateNotifications[Math.floor(Math.random() * dateNotifications.length)];
  }
  
  if (columnHeader === 'Status') {
    const statusNotifications = [
      "Status changed from 'In Progress' to 'On Hold'",
      "No updates in 7 days",
      "Blocked by dependency",
      "Requires immediate attention",
      "Client requested status update"
    ];
    return statusNotifications[Math.floor(Math.random() * statusNotifications.length)];
  }
  
  if (columnHeader === 'Priority') {
    const priorityNotifications = [
      "Escalated to HIGH",
      "De-prioritized by management",
      "Priority mismatch with client expectations",
      "Requires reprioritization",
      "Conflicts with other high priority items"
    ];
    return priorityNotifications[Math.floor(Math.random() * priorityNotifications.length)];
  }
  
  // Default notifications
  const defaultNotifications = [
    "Updated 10 minutes ago",
    "Changed by another user",
    "5 comments added",
    "New information available",
    "Requires your input",
    "Version conflict detected",
    "History shows multiple changes",
    "Linked item was modified"
  ];
  
  return defaultNotifications[Math.floor(Math.random() * defaultNotifications.length)];
};

// Tab titles for different spreadsheet types
const SPREADSHEET_TABS = [
  { id: 'projects', label: 'Project_Manager_v3.4_FINAL' },
  { id: 'tasks', label: 'Team_Tasks_2024_Master' },
  { id: 'content', label: 'Content_Tracker_USE_THIS' },
  { id: 'deadlines', label: 'URGENT_Deadlines_Q2' }
];

const ChaoticSpreadsheet: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetData>([]);
  const [commentPosition, setCommentPosition] = useState<{x: number, y: number, text: string} | null>(null);
  const [notificationPosition, setNotificationPosition] = useState<{x: number, y: number, text: string, urgent: boolean} | null>(null);
  const [animating, setAnimating] = useState(false);
  const [lagMode, setLagMode] = useState(false);
  const [flashingCell, setFlashingCell] = useState<{row: number, col: number} | null>(null);
  const [showFormatMenu, setShowFormatMenu] = useState(false);
  
  // Generate data when tab changes
  useEffect(() => {
    const rows = Math.floor(Math.random() * 10) + 15; // 15-25 rows
    const cols = 10; // Adjust based on the tab's specific columns

    const newData = generateCellData(rows, cols, activeTab);
    setSpreadsheetData(newData);
    
    // Reset popup states
    setCommentPosition(null);
    setNotificationPosition(null);
    setFlashingCell(null);
    
    // Randomly decide to introduce lag when switching tabs (10% chance)
    if (Math.random() < 0.1) {
      setLagMode(true);
      setTimeout(() => setLagMode(false), 1500); // Clear lag after 1.5 seconds
    }
  }, [activeTab]);
  
  // Setup animations
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create random notification animations
    const runRandomNotifications = () => {
      setAnimating(true);
      
      const cells = containerRef.current?.querySelectorAll('.spreadsheet-cell') || [];
      
      if (cells.length === 0) return;
      
      // Pick 2-5 random cells to animate
      const animationCount = Math.floor(Math.random() * 4) + 2;
      const availableCells = Array.from(cells);
      
      for (let i = 0; i < animationCount; i++) {
        if (availableCells.length === 0) break;
        
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const cell = availableCells[randomIndex];
        
        // Remove this cell from available cells to avoid duplicates
        availableCells.splice(randomIndex, 1);
        
        // Animate the cell
        gsap.timeline()
          .to(cell, {
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
            boxShadow: '0 0 6px rgba(255, 165, 0, 0.5)',
            duration: 0.2
          })
          .to(cell, {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            duration: 0.5,
            delay: 0.3
          });
      }
      
      // Occasionally make a cell flash repeatedly (5% chance)
      if (Math.random() < 0.05 && spreadsheetData.length > 1) {
        const randomRow = Math.floor(Math.random() * (spreadsheetData.length - 1)) + 1;
        const randomCol = Math.floor(Math.random() * (spreadsheetData[0].length - 1)) + 1;
        
        setFlashingCell({ row: randomRow, col: randomCol });
        
        // Stop flashing after 4-7 seconds
        setTimeout(() => {
          setFlashingCell(null);
        }, Math.random() * 3000 + 4000);
      }
      
      // Schedule the next batch of animations
      setTimeout(() => {
        setAnimating(false);
        
        // Random delay between animation batches (3-8 seconds)
        const nextDelay = Math.random() * 5000 + 3000;
        setTimeout(runRandomNotifications, nextDelay);
      }, 1000);
    };
    
    // Start the animations after a delay
    const initialDelay = Math.random() * 2000 + 1000;
    const timer = setTimeout(runRandomNotifications, initialDelay);
    
    // Randomly show format menu (3% chance every 10 seconds)
    const formatMenuTimer = setInterval(() => {
      if (Math.random() < 0.03) {
        setShowFormatMenu(true);
        setTimeout(() => setShowFormatMenu(false), 3000);
      }
    }, 10000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(formatMenuTimer);
    };
  }, [spreadsheetData]);
  
  // Handle showing comment popup
  const handleCellMouseEnter = (e: React.MouseEvent, cell: CellData) => {
    if (cell.hasComment) {
      const rect = e.currentTarget.getBoundingClientRect();
      setCommentPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
        text: cell.commentText
      });
    }
    
    if (cell.hasNotification) {
      const notificationIcon = (e.currentTarget as HTMLElement).querySelector('.notification-icon');
      if (notificationIcon) {
        const rect = notificationIcon.getBoundingClientRect();
        setNotificationPosition({
          x: rect.left,
          y: rect.top - 10,
          text: cell.notificationText || '',
          urgent: cell.notificationUrgent || false
        });
      }
    }
  };
  
  const handleCellMouseLeave = () => {
    setCommentPosition(null);
    setNotificationPosition(null);
  };
  
  // Switching tabs
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };
  
  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg">
      {/* Tab bar */}
      <div className="flex items-center p-2 border-b border-gray-200 bg-gray-50">
        {SPREADSHEET_TABS.map((tab) => (
          <div
            key={tab.id}
            className={`relative px-3 py-1.5 text-xs rounded-t cursor-pointer ${
              activeTab === tab.id 
                ? 'bg-white border border-gray-300 border-b-white -mb-px z-10' 
                : 'hover:bg-gray-100'
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
            {Math.random() < 0.5 && (
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full transform -translate-y-1/2 translate-x-1/2"></div>
            )}
          </div>
        ))}
        
        {/* Add tab button */}
        <div className="px-3 py-1.5 text-xs text-gray-500 cursor-pointer">
          <div className="w-4 h-4">+</div>
        </div>
      </div>
      
      {/* Toolbar */}
      <div className="flex items-center p-1 border-b border-gray-200 bg-gray-50">
        <div className="flex gap-1">
          <button className="p-1 hover:bg-gray-200 rounded">
            <Filter size={16} className="text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <Search size={16} className="text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <Edit3 size={16} className="text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <Menu size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
      
      {/* Spreadsheet table */}
      <div className={`w-full overflow-auto max-h-[400px] ${lagMode ? 'transition-transform duration-1000' : 'transition-none'}`}>
        <table className="w-full border-collapse">
          <tbody>
            {spreadsheetData.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex === 0 ? 'bg-gray-50' : ''}>
                {row.map((cell, cellIndex) => {
                  // Determine if this is the flashing cell
                  const isFlashing = flashingCell && 
                                    flashingCell.row === rowIndex && 
                                    flashingCell.col === cellIndex;
                  
                  if (typeof cell === 'string') {
                    // Header or row number cell
                    return (
                      <td 
                        key={`${rowIndex}-${cellIndex}`} 
                        className={`
                          spreadsheet-cell
                          border border-gray-200 py-2 px-3 
                          ${rowIndex === 0 ? 'font-medium sticky top-0 bg-gray-50 z-10' : ''} 
                          ${cellIndex === 0 ? 'font-medium sticky left-0 bg-gray-50 z-10' : ''}
                          ${rowIndex === 0 && cellIndex === 0 ? 'z-20' : ''}
                        `}
                      >
                        {cell}
                      </td>
                    );
                  } else {
                    // Data cell
                    return (
                      <td 
                        key={`${rowIndex}-${cellIndex}`}
                        className={`
                          spreadsheet-cell
                          relative border border-gray-200 py-2 px-3 text-sm
                          ${cell.class || ''}
                          ${isFlashing ? 'animate-pulse bg-yellow-100' : ''}
                        `}
                        onMouseEnter={(e) => handleCellMouseEnter(e, cell)}
                        onMouseLeave={handleCellMouseLeave}
                      >
                        {cell.type === 'formula' ? <span className="text-blue-600">{cell.value}</span> : cell.value}
                        {cell.hasComment && (
                          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          </div>
                        )}
                        {cell.hasNotification && (
                          <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 notification-icon">
                            <Bell 
                              size={14} 
                              className={`${cell.notificationUrgent ? 'text-red-500 animate-pulse' : 'text-amber-500'}`} 
                            />
                          </div>
                        )}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Comment popup */}
      {commentPosition && (
        <div 
          className="fixed z-50 p-2 text-xs bg-yellow-100 border border-yellow-400 rounded shadow-lg max-w-[200px]"
          style={{
            left: commentPosition.x,
            top: commentPosition.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="font-bold text-yellow-800">Comment:</div>
          <div className="text-yellow-900">{commentPosition.text}</div>
        </div>
      )}
      
      {/* Notification popup */}
      {notificationPosition && (
        <div 
          className={`fixed z-50 p-2 text-xs ${notificationPosition.urgent ? 'bg-red-100 border-red-400' : 'bg-amber-100 border-amber-400'} border rounded shadow-lg max-w-[220px]`}
          style={{
            left: notificationPosition.x,
            top: notificationPosition.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className={`font-bold ${notificationPosition.urgent ? 'text-red-800' : 'text-amber-800'} flex items-center gap-1`}>
            {notificationPosition.urgent && <AlertTriangle size={12} />}
            Notification:
          </div>
          <div className={notificationPosition.urgent ? 'text-red-900' : 'text-amber-900'}>
            {notificationPosition.text}
          </div>
        </div>
      )}
      
      {/* Random error dialogs and notifications */}
      {/* Error popup */}
      {!animating && Math.random() < 0.02 && (
        <div className="absolute flex flex-col items-center p-4 translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-xl right-1/2 top-1/3 z-30">
          <div className="flex items-center justify-between w-full mb-2">
            <div className="flex items-center gap-2">
              <AlertCircle size={20} className="text-red-500" />
              <span className="font-medium">Error</span>
            </div>
            <X size={16} className="text-gray-500 cursor-pointer" />
          </div>
          <div className="text-sm text-gray-600 mb-3">
            {[
              "Formula in cell G12 contains a circular reference.",
              "Cannot connect to server. Changes may not be saved.",
              "Invalid value in cell D8. Expected number, got text.",
              "File size exceeds cloud storage limit.",
              "Calculation error in sheet 'Budget Forecast'.",
              "Shared link has expired. Please reshare document."
            ][Math.floor(Math.random() * 6)]}
          </div>
          <div className="flex justify-end w-full gap-2">
            <button className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
              Help
            </button>
            <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
              OK
            </button>
          </div>
        </div>
      )}
      
      {/* Format menu popup */}
      {showFormatMenu && (
        <div className="absolute z-40 shadow-lg rounded bg-white border border-gray-200 top-20 left-20">
          <div className="text-xs font-semibold px-3 py-2 border-b border-gray-200">Format Cells</div>
          <div className="p-2 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs px-2 py-1 hover:bg-gray-100 cursor-pointer">
              <span className="font-bold">B</span>
              <span>Bold</span>
            </div>
            <div className="flex items-center gap-2 text-xs px-2 py-1 hover:bg-gray-100 cursor-pointer">
              <span className="italic">I</span>
              <span>Italic</span>
            </div>
            <div className="flex items-center gap-2 text-xs px-2 py-1 hover:bg-gray-100 cursor-pointer">
              <span className="underline">U</span>
              <span>Underline</span>
            </div>
            <div className="h-px bg-gray-200 my-1"></div>
            <div className="flex items-center gap-2 text-xs px-2 py-1 hover:bg-gray-100 cursor-pointer">
              <div className="w-3 h-3 bg-red-500"></div>
              <span>Background color</span>
            </div>
            <div className="flex items-center gap-2 text-xs px-2 py-1 hover:bg-gray-100 cursor-pointer">
              <div className="w-3 h-3 border border-gray-300 flex items-center justify-center text-[8px]">A</div>
              <span>Text color</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Occasional loading indicator */}
      {!animating && Math.random() < 0.015 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-[1px] z-30">
          <div className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="w-6 h-6 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <div className="text-sm font-medium text-gray-600">Loading...</div>
            <div className="text-xs text-gray-400">
              {[
                "Calculating formulas...",
                "Fetching shared data...",
                "Syncing with cloud...",
                "Updating references...",
                "Refreshing external data..."
              ][Math.floor(Math.random() * 5)]}
            </div>
          </div>
        </div>
      )}
      
      {/* "Save As..." dialog to occasionally appear */}
      {!animating && Math.random() < 0.01 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 z-30">
          <div className="w-80 p-4 bg-white border border-gray-300 rounded-lg shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Save As</h3>
              <X size={16} className="text-gray-500 cursor-pointer" />
            </div>
            <div className="flex flex-col gap-3 mb-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                defaultValue={SPREADSHEET_TABS.find(tab => tab.id === activeTab)?.label || ""}
              />
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Spreadsheet (.xlsx)</option>
                <option>Macro-Enabled Spreadsheet (.xlsm)</option>
                <option>CSV (.csv)</option>
                <option>PDF (.pdf)</option>
              </select>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock size={14} />
                <span>Autosave is paused</span>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button className="px-3 py-1 text-sm rounded hover:bg-gray-100">
                Cancel
              </button>
              <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Unsaved changes indicator that occasionally appears */}
      {Math.random() < 0.03 && (
        <div className="absolute bottom-0 right-0 m-2 p-2 bg-yellow-50 text-xs flex items-center gap-1.5 border border-yellow-300 rounded shadow-sm">
          <AlertTriangle size={12} className="text-yellow-600" />
          <span className="text-yellow-800">Unsaved changes</span>
        </div>
      )}
      
      {/* Version conflict warning */}
      {Math.random() < 0.015 && (
        <div className="absolute top-2 right-2 p-2 bg-red-50 text-xs flex items-center gap-1.5 border border-red-300 rounded shadow-sm z-40">
          <AlertCircle size={12} className="text-red-600" />
          <span className="text-red-800">Michael is editing this cell</span>
        </div>
      )}
    </div>
  );
};

export default ChaoticSpreadsheet;
