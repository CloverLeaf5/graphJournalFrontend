import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LoginSuccessPage from './pages/LoginSuccessPage';
import LoginErrorPage from './pages/LoginErrorPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoutes from './utils/ProtectedRoutes';
import TagEntryPage from './pages/TagEntryPage';
import PersonEntryPage from './pages/PersonEntryPage';
import GroupEntryPage from './pages/GroupEntryPage';
import MainEntryPage from './pages/MainEntryPage';
import ViewCreationPage from './pages/ViewCreationPage';
import TagEditPage from './pages/TagEditPage';
import PersonEditPage from './pages/PersonEditPage';
import GroupEditPage from './pages/GroupEditPage';
import EntriesViewerPage from './pages/EntriesViewerPage';
import EntryEditPage from './pages/EntryEditPage';
import ViewEditPage from './pages/ViewEditPage';
import ViewCombineSearchPage from './pages/ViewCombineSearchPage';
import ViewFilterSearchPage from './pages/ViewFilterSearchPage';
import SavedViewPage from './pages/SavedViewPage';
import SavedViewsListPage from './pages/SavedViewsListPage';
import EntryViewerPage from './pages/EntryViewerPage';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/login" element={ <LoginPage/> } />
        <Route path="/login/success" element={ <LoginSuccessPage/> } />
        <Route path="/login/error" element={ <LoginErrorPage/> } />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/dashboard" element={ <DashboardPage/> } />
          <Route path="/tagEntry" element={ <TagEntryPage/> } />
          <Route path="/personEntry" element={ <PersonEntryPage/> } />
          <Route path="/groupEntry" element={ <GroupEntryPage/> } />
          <Route path="/mainEntry" element={ <MainEntryPage/> } />
          <Route path="/viewCreation" element={ <ViewCreationPage/> } />
          <Route path="/tagEdit" element={ <TagEditPage/> } />
          <Route path="/personEdit" element={ <PersonEditPage/> } />
          <Route path="/groupEdit" element={ <GroupEditPage/> } />
          <Route path="/entriesViewer" element={ <EntriesViewerPage/> } />
          <Route path="/entryEdit" element={ <EntryEditPage/> } />
          <Route path="/viewEdit" element={ <ViewEditPage/> } />
          <Route path="/viewCombine" element={ <ViewCombineSearchPage/> } />
          <Route path="/viewFilter" element={ <ViewFilterSearchPage/> } />
          <Route path="/savedView" element={ <SavedViewPage/> } />
          <Route path="/savedViewsList" element={ <SavedViewsListPage/> } />
          <Route path="/entryView" element={ <EntryViewerPage/> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
