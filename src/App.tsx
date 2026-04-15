/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { Projects } from '@/components/Projects';
import { Inventory } from '@/components/Inventory';
import { Budgeting } from '@/components/Budgeting';
import { Workforce } from '@/components/Workforce';
import { Schedule } from '@/components/Schedule';
import { Suppliers } from '@/components/Suppliers';
import { Messages } from '@/components/Messages';
import { Reports } from '@/components/Reports';
import { Notifications } from '@/components/Notifications';
import { AIAssistant } from '@/components/AIAssistant';
import { AuthPage } from '@/components/AuthPage';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if user exists in Firestore, if not create
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
          const pendingRole = localStorage.getItem('pending_role') || 'contractor';
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || 'User',
            photoURL: user.photoURL || '',
            role: pendingRole,
            createdAt: serverTimestamp(),
          });
          localStorage.removeItem('pending_role');
        }
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <Projects />;
      case 'inventory':
        return <Inventory />;
      case 'budget':
        return <Budgeting />;
      case 'workforce':
        return <Workforce />;
      case 'schedule':
        return <Schedule />;
      case 'suppliers':
        return <Suppliers />;
      case 'messages':
        return <Messages />;
      case 'reports':
        return <Reports />;
      case 'notifications':
        return <Notifications />;
      case 'ai_assistant':
        return <AIAssistant />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 lg:pl-64">
        <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

