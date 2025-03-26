import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { 
  FileText, 
  ImageIcon, 
  FileIcon, 
  Music as MusicIcon, 
  Video as VideoIcon, 
  Archive as ArchiveIcon, 
  Folder, 
  FolderOpen,
  ChevronRight, 
  X, 
  Search, 
  Clock, 
  AlertTriangle, 
  Bell, 
  CheckCircle2, 
  Info,
  Users,
  Mail
} from 'lucide-react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Folder structure types
interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  modified: string;
  path?: string;
  tags?: string[];
}

interface FolderItem {
  id: string;
  name: string;
  files: FileItem[];
  subfolders: FolderItem[];
  path: string;
  expanded?: boolean;
  modified?: string;
}

interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'error' | 'success';
  time: string;
}

// Generate a simplified folder structure
const generateChaos = (): FolderItem[] => {
  const folders: FolderItem[] = [];
  
  // Project folders - reducing to just 2 key folders
  ['Project X', 'Marketing Campaign'].forEach((folderName, index) => {
    // Generate a consistent folder ID
    const folder: FolderItem = {
      id: `folder-${folderName.toLowerCase().replace(/\s+/g, '-')}`,
      name: folderName,
      files: [],
      subfolders: [],
      path: folderName,
      expanded: index === 0, // First folder expanded by default
      modified: "March 20, 2025"
    };
    
    // Add different types of files to each folder
    const projectFiles: FileItem[] = [
      {
        id: `file-${Date.now() + Math.random()}`,
        name: `${folderName} Proposal FINAL.docx`,
        type: 'DOCX',
        size: '245 KB',
        modified: 'March 15, 2025',
        path: `${folder.path}/${folderName} Proposal FINAL.docx`,
        tags: ['proposal', 'final', 'document']
      },
      {
        id: `file-${Date.now() + Math.random()}`,
        name: `${folderName} Budget v3.xlsx`,
        type: 'XLSX',
        size: '128 KB',
        modified: 'March 18, 2025',
        path: `${folder.path}/${folderName} Budget v3.xlsx`,
        tags: ['budget', 'finance', 'spreadsheet']
      }
    ];
    
    folder.files.push(...projectFiles);
    
    // Add common files with humorous naming conventions
    const randomProjectFiles: FileItem[] = [
      {
        id: `file-${Date.now() + Math.random()}`,
        name: `${folderName} Presentation FINAL ACTUALLY FINAL.pptx`,
        type: 'PPTX',
        size: '4.2 MB',
        modified: 'March 19, 2025',
        path: `${folder.path}/${folderName} Presentation FINAL ACTUALLY FINAL.pptx`,
        tags: ['presentation', 'final', 'slides']
      },
      {
        id: `file-${Date.now() + Math.random()}`,
        name: `${folderName} Notes from Meeting DO NOT DELETE.txt`,
        type: 'TXT',
        size: '12 KB',
        modified: 'March 14, 2025',
        path: `${folder.path}/${folderName} Notes from Meeting DO NOT DELETE.txt`,
        tags: ['notes', 'meeting', 'important']
      }
    ];
    
    folder.files.push(...randomProjectFiles);
    
    const subfolders: FolderItem[] = [];
    
    // Add a nested subfolder for "Marketing Campaign" with easter eggs
    if (folderName === 'Marketing Campaign') {
      subfolders.push({
        id: `folder-ideas-${Date.now() + Math.random()}`,
        name: 'Ideas That Were Rejected',
        files: [
          {
            id: `file-bad-ideas-${Date.now() + Math.random()}`,
            name: 'Dancing Mascot.mp4',
            type: 'MP4',
            size: '45 MB',
            modified: 'January 12, 2025',
            tags: ['marketing', 'terrible', 'mascot']
          },
          {
            id: `file-bad-ideas-${Date.now() + Math.random()}`,
            name: 'Jingle_Final_v4_ACTUALLY_FINAL.mp3',
            type: 'MP3',
            size: '3.2 MB',
            modified: 'February 15, 2025',
            tags: ['marketing', 'jingle', 'final']
          },
          {
            id: `file-bad-ideas-${Date.now() + Math.random()}`,
            name: 'Social Media Strategy (Rejected by Legal).docx',
            type: 'DOCX',
            size: '78 KB',
            modified: 'March 2, 2025',
            tags: ['marketing', 'legal', 'rejected']
          }
        ],
        subfolders: [],
        path: `${folder.path}/Marketing Campaign/Ideas That Were Rejected`,
        expanded: false,
        modified: "February 2, 2025"
      });
    }
    
    folder.subfolders = subfolders;
    folders.push(folder);
  });
  
  // Add a Personal folder with various easter eggs including cat pictures
  folders.push({
    id: `folder-personal-${Date.now() + Math.random()}`,
    name: 'Personal',
    files: [
      {
        id: `file-personal-${Date.now() + Math.random()}`,
        name: 'Resume_2025_DO_NOT_SHARE.docx',
        type: 'DOCX',
        size: '320 KB',
        modified: 'February 28, 2025',
        tags: ['personal', 'job', 'secret']
      },
      {
        id: `file-personal-${Date.now() + Math.random()}`,
        name: 'Passive_Aggressive_Email_Templates.docx',
        type: 'DOCX',
        size: '45 KB',
        modified: 'March 10, 2025',
        tags: ['personal', 'work', 'emails']
      }
    ],
    subfolders: [
      {
        id: `folder-cats-${Date.now() + Math.random()}`,
        name: 'Pictures of Cats',
        files: [
          {
            id: `file-cat-${Date.now() + Math.random()}`,
            name: 'Fluffy_business_cat.jpg',
            type: 'JPG',
            size: '2.3 MB',
            modified: 'March 15, 2025',
            tags: ['cats', 'personal', 'cute']
          },
          {
            id: `file-cat-${Date.now() + Math.random()}`,
            name: 'Cat_sleeping_on_keyboard.jpg',
            type: 'JPG',
            size: '1.8 MB',
            modified: 'March 17, 2025',
            tags: ['cats', 'personal', 'work']
          },
          {
            id: `file-cat-${Date.now() + Math.random()}`,
            name: 'Cat_wearing_tie.jpg',
            type: 'JPG',
            size: '3.1 MB',
            modified: 'March 18, 2025',
            tags: ['cats', 'personal', 'funny']
          },
          {
            id: `file-cat-${Date.now() + Math.random()}`,
            name: 'Cat_judging_my_work.png',
            type: 'PNG',
            size: '4.2 MB',
            modified: 'March 19, 2025',
            tags: ['cats', 'personal', 'judgmental']
          }
        ],
        subfolders: [
          {
            id: `folder-catsecret-${Date.now() + Math.random()}`,
            name: 'Secret Cat Project',
            files: [
              {
                id: `file-catsecret-${Date.now() + Math.random()}`,
                name: 'Plan_for_world_domination_by_cats.pdf',
                type: 'PDF',
                size: '1.4 MB',
                modified: 'March 22, 2025',
                tags: ['cats', 'personal', 'secret', 'plan']
              },
              {
                id: `file-catsecret-${Date.now() + Math.random()}`,
                name: 'Cat_treats_budget.xlsx',
                type: 'XLSX',
                size: '245 KB',
                modified: 'March 23, 2025',
                tags: ['cats', 'personal', 'budget']
              }
            ],
            subfolders: [],
            path: 'Personal/Pictures of Cats/Secret Cat Project',
            expanded: false,
            modified: 'March 23, 2025'
          }
        ],
        path: 'Personal/Pictures of Cats',
        expanded: false,
        modified: 'March 20, 2025'
      }
    ],
    path: 'Personal',
    expanded: false,
    modified: 'March 10, 2025'
  });
  
  // Add one shared drive folder for context
  folders.push({
    id: "folder-desktop",
    name: "Desktop",
    files: [
      {
        id: `file-${Date.now() + Math.random()}`,
        name: "Screenshot 2025-03-21 at 15.43.22.png",
        type: "PNG",
        size: "1.2 MB",
        modified: "March 21, 2025",
        tags: ['screenshot', 'desktop']
      }
    ],
    subfolders: [],
    path: "Desktop",
    expanded: false,
    modified: "March 22, 2025"
  });
  
  return folders;
};

// Create a flat list of all files for search functionality
const extractAllFiles = (folders: FolderItem[]): FileItem[] => {
  let allFiles: FileItem[] = [];
  
  const processFolder = (folder: FolderItem) => {
    // Add files from this folder
    allFiles = [...allFiles, ...folder.files];
    
    // Process subfolders recursively
    folder.subfolders.forEach(subfolder => {
      processFolder(subfolder);
    });
  };
  
  folders.forEach(folder => {
    processFolder(folder);
  });
  
  return allFiles;
};

// Generate simplified folder structure
const chaosStructure = generateChaos();
// Extract all files for search
const allFiles = extractAllFiles(chaosStructure);

// Sample notifications
const notifications: Notification[] = [
  { 
    id: 'notif1', 
    title: 'New email from Sarah Chen', 
    content: 'Quick update on the client meeting tomorrow',
    type: 'info',
    time: 'Just now' 
  },
  { 
    id: 'notif2', 
    type: 'info', 
    title: 'Meeting reminder', 
    content: 'Strategy session in 15 minutes',
    time: '2:45 PM' 
  },
  { 
    id: 'notif3', 
    type: 'info', 
    title: 'Message from Design Team', 
    content: 'The new mockups are ready for review',
    time: '5 min ago' 
  },
  { 
    id: 'notif4', 
    type: 'error', 
    title: 'System alert', 
    content: 'Your storage is nearly full (92%)',
    time: '12 min ago' 
  },
  { 
    id: 'notif5', 
    type: 'info', 
    title: 'New email from Alex Morgan', 
    content: 'Updated budget numbers for Q2',
    time: '28 min ago' 
  },
  { 
    id: 'notif6', 
    type: 'info', 
    title: 'Message from James', 
    content: 'Can we discuss the timeline changes?',
    time: '32 min ago' 
  },
  { 
    id: 'notif7', 
    type: 'error', 
    title: 'File sync error', 
    content: 'Failed to sync "Project X FINAL" folder',
    time: '15 min ago' 
  },
  { 
    id: 'notif8', 
    type: 'info', 
    title: 'New email from IT Support', 
    content: 'Your storage space is almost full. Please clean up your files.',
    time: '45 min ago' 
  }
];

export function HeroFileSystemAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const fileExplorerRef = useRef<HTMLDivElement>(null);
  const fileListRef = useRef<HTMLDivElement>(null);
  const notificationsPanelRef = useRef<HTMLDivElement>(null);
  const activeNotificationsRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  
  const [visibleNotifications, setVisibleNotifications] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<FileItem[]>([]);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [folderStructure, setFolderStructure] = useState<FolderItem[]>(chaosStructure);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'budget', 'meeting notes', 'final presentation', 'important', 'logo', 'cats'
  ]);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [interactionMessages, setInteractionMessages] = useState<string[]>([]);
  const [clientMessageState, setClientMessageState] = useState<string>('new');
  const [notificationContents, setNotificationContents] = useState<Record<string, Notification>>({});

  // Function to handle clickable notifications
  const handleNotificationClick = (notifId: string) => {
    // Find the notification in our state
    const notification = notificationContents[notifId];
    if (!notification) return;
    
    // Handle client message transformation
    if (notification.title.includes("New message from client")) {
      // Update the notification content
      setNotificationContents(prev => ({
        ...prev,
        [notifId]: {
          ...notification,
          title: "URGENT: Client Demands Update",
          content: "Where's my update? I needed it yesterday!",
          type: 'error',
          time: new Date().toLocaleTimeString()
        }
      }));
      setClientMessageState('urgent');
      
      // Add a new interaction message
      setInteractionMessages(prev => [
        "Client is getting impatient. Maybe check those cat pictures instead?",
        ...prev
      ].slice(0, 3));
    }
  };
  
  // Function to handle search
  const handleSearch = (term: string) => {
    // Bail if search term is too short
    if (term.length < 2) {
      setSearchResults([]);
      setSearchActive(false);
      setSearchError(null);
      return;
    }
    
    setSearchTerm(term);
    setSearchActive(true);
    setUserInteracted(true);
    
    // Add to search history if not already present
    if (!searchHistory.includes(term) && term.length > 2) {
      setSearchHistory(prev => [term, ...prev].slice(0, 5));
    }
    
    // Perform search
    const results = allFiles.filter(file => {
      // Search in file name, path, and tags
      const nameMatch = file.name.toLowerCase().includes(term.toLowerCase());
      const pathMatch = file.path ? file.path.toLowerCase().includes(term.toLowerCase()) : false;
      const tagMatch = file.tags ? file.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase())) : false;
      
      return nameMatch || pathMatch || tagMatch;
    });
    
    // Too many results is a common file search frustration
    if (results.length > 100) {
      setSearchError(`Found too many results (${results.length}). Try a more specific search.`);
      // Still show results, but limited
      setSearchResults(results.slice(0, 25));
    } else if (results.length === 0) {
      setSearchError('No files found. Try a different search term.');
      setSearchResults([]);
    } else {
      setSearchError(null);
      setSearchResults(results);
      
      // Add a message about the search
      if (userInteracted) {
        const message = getRandomSearchMessage(term, results.length);
        setInteractionMessages(prev => [message, ...prev].slice(0, 3));
      }
    }
  };
  
  // Random funny search messages
  const getRandomSearchMessage = (term: string, resultCount: number): string => {
    const searchMessages = [
      `Found ${resultCount} items matching "${term}"... but are they the ones you want?`,
      `${resultCount} results. Good luck finding what you actually need!`,
      `${resultCount} files found. Hope you remember which version you need!`,
      `Searching for "${term}" - found ${resultCount} files. Some might even be relevant!`,
      `${resultCount} files match "${term}". One of them has to be the right one, right?`,
      `Found ${resultCount} results for "${term}". That feeling when you can't find anything, despite having too many files.`,
      `${resultCount} results. Did you save it in "final" or "FINAL" or "final_v2"?`,
      `${resultCount} matches. Try adding "final" or "important" to find the one you need.`,
      `${resultCount} files found matching "${term}". Where did you put that file again?`
    ];
    
    return searchMessages[Math.floor(Math.random() * searchMessages.length)];
  };

  // Function to toggle folder expansion
  const toggleFolder = (folderId: string) => {
    setUserInteracted(true);
    
    const toggleFolderRecursive = (folders: FolderItem[]): FolderItem[] => {
      return folders.map(folder => {
        if (folder.id === folderId) {
          return { ...folder, expanded: !folder.expanded };
        }
        
        return {
          ...folder,
          subfolders: toggleFolderRecursive(folder.subfolders)
        };
      });
    };
    
    setFolderStructure(toggleFolderRecursive(folderStructure));
    
    // Add message about folder expansion
    const folder = findFolderById(folderId, folderStructure);
    if (folder) {
      const message = folder.expanded 
        ? `Closing "${folder.name}". Maybe it was in another folder?`
        : `Opening "${folder.name}". Let's hope the file you need is in here!`;
      setInteractionMessages(prev => [message, ...prev].slice(0, 3));
    }
  };

  // Helper to find folder by ID
  const findFolderById = (id: string, folders: FolderItem[]): FolderItem | null => {
    for (const folder of folders) {
      if (folder.id === id) {
        return folder;
      }
      
      const found = findFolderById(id, folder.subfolders);
      if (found) {
        return found;
      }
    }
    
    return null;
  };

  // Function to select a file
  const selectFile = (file: FileItem) => {
    setUserInteracted(true);
    setSelectedFile(file);
    
    // Special handling for certain files (easter eggs)
    if (file.name === 'Plan_for_world_domination_by_cats.pdf') {
      // Create a special notification
      const notifId = `easter-egg-${Date.now()}`;
      setNotificationContents(prev => ({
        ...prev,
        [notifId]: {
          id: notifId,
          title: "Operation Purrfect",
          content: "Cat overlord: 'Human, your assistance in our plans has been noted.'",
          type: 'info',
          time: new Date().toLocaleTimeString()
        }
      }));
      setVisibleNotifications(prev => [notifId, ...prev].slice(0, 4));
      
      // Add a special message
      setInteractionMessages(prev => [
        "The cats are watching you open their secret files...",
        ...prev
      ].slice(0, 3));
      
      return;
    }
    
    if (file.name === 'Passive_Aggressive_Email_Templates.docx') {
      // Create a special notification
      const notifId = `easter-egg-${Date.now()}`;
      setNotificationContents(prev => ({
        ...prev,
        [notifId]: {
          id: notifId,
          title: "Email Templates",
          content: "Template #1: 'As per my previous email that you clearly didn't read...'",
          type: 'info',
          time: new Date().toLocaleTimeString()
        }
      }));
      setVisibleNotifications(prev => [notifId, ...prev].slice(0, 4));
      
      return;
    }
    
    // Show a message about file selection
    const messages = [
      `"${file.name}" selected. This doesn't look like the right one either...`,
      `Opening "${file.name}". Wait, is this the right version?`,
      `"${file.name}" - nope, this is from last month. Where's the latest one?`,
      `"${file.name}" - are you sure you didn't rename it to something else?`,
      `"${file.name}" - who saved this here? This should be in the project folder!`
    ];
    
    setInteractionMessages(prev => [
      messages[Math.floor(Math.random() * messages.length)],
      ...prev
    ].slice(0, 3));
    
    // Sometimes trigger error notifications
    if (Math.random() > 0.7) {
      setTimeout(() => {
        const errorMessages = [
          { 
            title: "File access error", 
            content: `Could not open "${file.name}". File may be corrupted.`,
            type: 'error' as const
          },
          { 
            title: "Application error", 
            content: `Cannot display this file format.`,
            type: 'error' as const
          },
          { 
            title: "Network error", 
            content: `Unable to load file from server. Check your connection.`,
            type: 'error' as const
          },
          { 
            title: "File locked", 
            content: `"${file.name}" is currently being edited by another user.`,
            type: 'warning' as const
          }
        ];
        
        const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        const notifId = `error-${Date.now()}`;
        
        setNotificationContents(prev => ({
          ...prev,
          [notifId]: {
            id: notifId,
            ...randomError,
            time: new Date().toLocaleTimeString()
          }
        }));
        
        setVisibleNotifications(prev => [notifId, ...prev].slice(0, 4));
      }, 800 + Math.random() * 1200);
    }
  };

  useEffect(() => {
    // Initial animation to fade in the desktop
    if (desktopRef.current) {
      gsap.fromTo(desktopRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.8 }
      );
    }

    // Setup initial notifications
    const initialNotifs = [
      {
        id: 'notification-1',
        notification: {
          id: 'notification-1',
          title: "Storage almost full",
          content: "Your drive is 98% full. Consider deleting files you no longer need.",
          type: 'warning' as const,
          time: new Date().toLocaleTimeString()
        }
      },
      {
        id: 'notification-2',
        notification: {
          id: 'notification-2',
          title: "New message from client",
          content: "RE: Project status update",
          type: 'info' as const,
          time: new Date().toLocaleTimeString()
        }
      },
      {
        id: 'notification-3',
        notification: {
          id: 'notification-3',
          title: "System update available",
          content: "Version 12.4.2 is ready to install.",
          type: 'info' as const,
          time: new Date().toLocaleTimeString()
        }
      }
    ];
    
    // Set initial notification contents
    const initialContents: Record<string, Notification> = {};
    initialNotifs.forEach(({ id, notification }) => {
      initialContents[id] = notification;
    });
    setNotificationContents(initialContents);
    
    // Set visible notifications
    setVisibleNotifications(initialNotifs.map(n => n.id));
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Function to get the appropriate icon for a file type
  const getFileIcon = (type: string) => {
    const fileType = type.toLowerCase();
    if (fileType.includes('doc')) return <FileText size={16} className="text-blue-500" />;
    if (fileType.includes('pdf')) return <FileText size={16} className="text-red-500" />;
    if (fileType.includes('xls')) return <FileText size={16} className="text-green-500" />;
    if (fileType.includes('ppt')) return <FileText size={16} className="text-orange-500" />;
    if (fileType.includes('jpg') || fileType.includes('png') || fileType.includes('gif')) {
      return <ImageIcon size={16} className="text-purple-500" />;
    }
    if (fileType.includes('mp3') || fileType.includes('wav')) {
      return <MusicIcon size={16} className="text-yellow-500" />;
    }
    if (fileType.includes('mp4') || fileType.includes('mov')) {
      return <VideoIcon size={16} className="text-pink-500" />;
    }
    if (fileType.includes('zip') || fileType.includes('rar')) {
      return <ArchiveIcon size={16} className="text-gray-500" />;
    }
    return <FileIcon size={16} className="text-gray-500" />;
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Desktop mockup */}
      <div 
        ref={desktopRef} 
        className="relative h-full w-full bg-white opacity-0"
      >
        {/* File explorer window */}
        <div 
          ref={fileExplorerRef}
          className="absolute top-0 left-[5%] right-[5%] bottom-[300px] bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden"
        >
          {/* Explorer header */}
          <div className="h-12 bg-gray-50 border-b border-gray-200 flex items-center px-4">
            <div className="flex-1 flex items-center">
              <span className="text-sm font-medium text-gray-700">Documents</span>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-sm text-gray-500">Projects</span>
            </div>
            <div 
              ref={searchBarRef}
              className="relative w-64 h-8"
            >
              <div className="absolute inset-0 flex items-center border border-gray-300 rounded bg-white px-2">
                <Search size={14} className="text-gray-400 mr-1" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="text-xs w-full bg-transparent border-none outline-none text-gray-800"
                  placeholder="Search files..."
                />
                {searchTerm && (
                  <button className="text-gray-400 hover:text-gray-600">
                    <X size={14} />
                  </button>
                )}
              </div>
              
              {/* Search history dropdown */}
              {searchTerm && searchTerm.length > 0 && !searchActive && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-md z-10">
                  <div className="py-1">
                    {searchHistory.map((term, index) => (
                      <div 
                        key={`history-${index}`}
                        className="px-3 py-1.5 text-xs hover:bg-gray-50 cursor-pointer flex items-center"
                        onClick={() => handleSearch(term)}
                      >
                        <Clock size={12} className="text-gray-400 mr-2" />
                        <span>{term}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* File list header */}
          <div className="h-8 border-b border-gray-200 grid grid-cols-12 gap-2 px-4 bg-gray-50 text-xs font-medium text-gray-500">
            <div className="col-span-5 flex items-center">Name</div>
            <div className="col-span-2 flex items-center">Type</div>
            <div className="col-span-2 flex items-center">Size</div>
            <div className="col-span-3 flex items-center">Modified</div>
          </div>
          
          {/* File list (scrollable) */}
          <div 
            ref={fileListRef}
            className="absolute inset-0 mt-[84px] overflow-auto"
          >
            <div className="min-h-full">
              {/* Search results or folder structure */}
              {searchActive && searchResults.length > 0 ? (
                <>
                  <div className="px-4 py-2 text-xs text-gray-500 bg-blue-50 sticky top-0">
                    Search results for "{searchTerm}" ({searchResults.length})
                  </div>
                  {searchResults.map((file) => (
                    <div 
                      key={file.id}
                      className={`grid grid-cols-12 gap-2 px-4 py-2 border-b border-gray-100 hover:bg-gray-50 text-xs cursor-pointer ${selectedFile?.id === file.id ? 'bg-blue-50' : ''}`}
                      onClick={() => selectFile(file)}
                    >
                      <div className="col-span-5 flex items-center">
                        <div className="mr-2 flex-shrink-0">
                          {getFileIcon(file.type)}
                        </div>
                        <span className="text-gray-800 truncate">{file.name}</span>
                      </div>
                      <div className="col-span-2 flex items-center text-gray-500">{file.type}</div>
                      <div className="col-span-2 flex items-center text-gray-500">{file.size}</div>
                      <div className="col-span-3 flex items-center text-gray-500">
                        <div className="truncate">{file.modified}</div>
                      </div>
                    </div>
                  ))}
                  {searchError && (
                    <div className="px-4 py-3 text-xs text-amber-600 bg-amber-50 border-t border-amber-100">
                      <AlertTriangle size={14} className="inline-block mr-1" />
                      {searchError}
                    </div>
                  )}
                </>
              ) : (
                folderStructure.map((folder) => (
                  <div key={folder.id}>
                    <div 
                      className={`grid grid-cols-12 gap-2 px-4 py-2 border-b border-gray-100 hover:bg-gray-50 text-xs cursor-pointer ${selectedFolder === folder.id ? 'bg-blue-50' : ''}`}
                      onClick={() => toggleFolder(folder.id)}
                    >
                      <div className="col-span-5 flex items-center">
                        <div className="mr-2 flex-shrink-0">
                          {folder.expanded ? <FolderOpen size={16} className="text-yellow-500" /> : <Folder size={16} className="text-yellow-500" />}
                        </div>
                        <span className="text-gray-800 truncate">{folder.name}</span>
                        <ChevronRight size={14} className={`ml-1 text-gray-400 transition-transform ${folder.expanded ? 'rotate-90' : ''}`} />
                      </div>
                      <div className="col-span-2 flex items-center text-gray-500">Folder</div>
                      <div className="col-span-2 flex items-center text-gray-500">—</div>
                      <div className="col-span-3 flex items-center text-gray-500">
                        {folder.modified || 'March 22, 2025'}
                      </div>
                    </div>
                    {folder.expanded && (
                      <div className="ml-6">
                        {folder.files.map(file => (
                          <div 
                            key={file.id}
                            className={`grid grid-cols-12 gap-2 px-4 py-2 border-b border-gray-100 hover:bg-gray-50 text-xs cursor-pointer ${selectedFile?.id === file.id ? 'bg-blue-50' : ''}`}
                            onClick={() => selectFile(file)}
                          >
                            <div className="col-span-5 flex items-center">
                              <div className="mr-2 flex-shrink-0">
                                {getFileIcon(file.type)}
                              </div>
                              <span className="text-gray-800 truncate">{file.name}</span>
                            </div>
                            <div className="col-span-2 flex items-center text-gray-500">{file.type}</div>
                            <div className="col-span-2 flex items-center text-gray-500">{file.size}</div>
                            <div className="col-span-3 flex items-center text-gray-500">{file.modified}</div>
                          </div>
                        ))}
                        {folder.subfolders.map(subfolder => (
                          <div key={subfolder.id}>
                            <div 
                              className={`grid grid-cols-12 gap-2 px-4 py-2 border-b border-gray-100 hover:bg-gray-50 text-xs cursor-pointer ${selectedFolder === subfolder.id ? 'bg-blue-50' : ''}`}
                              onClick={() => toggleFolder(subfolder.id)}
                            >
                              <div className="col-span-5 flex items-center">
                                <div className="mr-2 flex-shrink-0">
                                  {subfolder.expanded ? <FolderOpen size={16} className="text-yellow-500" /> : <Folder size={16} className="text-yellow-500" />}
                                </div>
                                <span className="text-gray-800 truncate">{subfolder.name}</span>
                                <ChevronRight size={14} className={`ml-1 text-gray-400 transition-transform ${subfolder.expanded ? 'rotate-90' : ''}`} />
                              </div>
                              <div className="col-span-2 flex items-center text-gray-500">Folder</div>
                              <div className="col-span-2 flex items-center text-gray-500">—</div>
                              <div className="col-span-3 flex items-center text-gray-500">
                                {subfolder.modified || 'March 15, 2025'}
                              </div>
                            </div>
                            {subfolder.expanded && (
                              <div className="ml-6">
                                {subfolder.files.map(file => (
                                  <div 
                                    key={file.id}
                                    className={`grid grid-cols-12 gap-2 px-4 py-2 border-b border-gray-100 hover:bg-gray-50 text-xs cursor-pointer ${selectedFile?.id === file.id ? 'bg-blue-50' : ''}`}
                                    onClick={() => selectFile(file)}
                                  >
                                    <div className="col-span-5 flex items-center">
                                      <div className="mr-2 flex-shrink-0">
                                        {getFileIcon(file.type)}
                                      </div>
                                      <span className="text-gray-800 truncate">{file.name}</span>
                                    </div>
                                    <div className="col-span-2 flex items-center text-gray-500">{file.type}</div>
                                    <div className="col-span-2 flex items-center text-gray-500">{file.size}</div>
                                    <div className="col-span-3 flex items-center text-gray-500">{file.modified}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Search interaction message */}
        {interactionMessages.length > 0 && (
          <div className="absolute top-32 left-[30%] transform -translate-x-1/2 p-2 bg-white border border-gray-200 shadow-lg rounded-lg z-10 max-w-xs animate-fadeIn">
            <div className="text-xs text-gray-800 flex items-start">
              <AlertTriangle size={14} className="text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
              <p>{interactionMessages[0]}</p>
            </div>
          </div>
        )}
        
        {/* Notifications panel */}
        <div 
          ref={notificationsPanelRef}
          className="absolute top-[25%] right-5 w-72 max-h-[300px] bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden"
        >
          <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center justify-between px-4">
            <span className="text-sm font-medium text-gray-700">Notifications</span>
            <span className="text-xs font-medium text-gray-500 py-1 px-2 rounded bg-gray-200">
              {visibleNotifications.length}
            </span>
          </div>
          
          <div 
            ref={activeNotificationsRef}
            className="max-h-[290px] overflow-auto"
          >
            {visibleNotifications.map((notifId) => {
              const notification = notificationContents[notifId] || { 
                title: "Notification", 
                content: "Something happened" 
              };
              
              return (
                <div 
                  key={notifId}
                  className={`p-3 border-b border-gray-100 text-xs hover:bg-gray-50 cursor-pointer ${
                    notifId === 'notification-2' && clientMessageState === 'urgent' ? 'bg-red-50' : ''
                  }`}
                  onClick={() => handleNotificationClick(notifId)}
                >
                  <div className="font-medium text-gray-800 mb-1">{notification.title}</div>
                  <div className="text-gray-600">{notification.content}</div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Chat window */}
        <div 
          ref={chatWindowRef}
          className="absolute bottom-4 left-[5%] right-[5%] h-[120px] bg-white border border-gray-200 rounded-md shadow-md overflow-hidden"
        >
          <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center justify-between px-3">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs font-medium text-gray-700">Team Chat</span>
            </div>
            <div className="flex items-center space-x-1">
              <button className="text-gray-400 hover:text-gray-600">
                <Users size={14} />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            </div>
          </div>
          
          <div className="p-3 h-[calc(100%-56px)] flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="flex mb-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-2">M</div>
                <div className="bg-blue-50 rounded-lg px-2 py-1 max-w-[70%] text-xs">
                  <p className="text-gray-800">Has anyone found the latest budget file?</p>
                  <p className="text-[10px] text-gray-400 mt-1">2:47 PM</p>
                </div>
              </div>
              <div className="flex mb-2 justify-end">
                <div className="bg-gray-100 rounded-lg px-2 py-1 max-w-[70%] text-xs">
                  <p className="text-gray-800">I think Sarah has it</p>
                  <p className="text-[10px] text-gray-400 mt-1">2:49 PM</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold ml-2">Y</div>
              </div>
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold mr-2">S</div>
                <div className="bg-purple-50 rounded-lg px-2 py-1 max-w-[70%] text-xs animate-fadeIn">
                  <p className="text-gray-800">Checking, one sec...</p>
                  <p className="text-[10px] text-gray-400 mt-1">Just now</p>
                </div>
              </div>
            </div>
            
            <div className="mt-2 flex items-center border border-gray-200 rounded-md px-2 py-1">
              <input type="text" className="text-xs w-full bg-transparent border-none outline-none" placeholder="Type a message..." />
              <button className="text-gray-400 hover:text-gray-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating status indicators (multiple) */}
        <div className="absolute top-24 right-[8%] p-2 bg-red-50 border border-red-200 rounded-md shadow-sm animate-pulse">
          <div className="flex items-center text-xs text-red-600">
            <AlertTriangle size={14} className="mr-1.5" />
            <span>Storage usage critical (92%)</span>
          </div>
        </div>
        
        <div className="absolute top-24 left-[8%] p-2 bg-amber-50 border border-amber-200 rounded-md shadow-sm">
          <div className="flex items-center text-xs text-amber-600">
            <AlertTriangle size={14} className="mr-1.5" />
            <span>5 files need review</span>
          </div>
        </div>
        
        <div className="absolute top-[45%] right-[15%] p-2 bg-blue-50 border border-blue-200 rounded-md shadow-sm">
          <div className="flex items-center text-xs text-blue-600">
            <Mail size={14} className="mr-1.5" />
            <span>New message from Client</span>
          </div>
        </div>
        
        {/* System toast notification */}
        <div className="absolute bottom-[140px] left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white rounded shadow-lg flex items-center text-xs">
          <CheckCircle2 size={14} className="text-green-400 mr-2" />
          <span>Auto-save complete</span>
          <button className="ml-3 text-gray-400 hover:text-gray-200">
            <X size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
