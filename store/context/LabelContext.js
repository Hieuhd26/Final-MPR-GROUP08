import { createContext, useState } from "react";
import { LABELS } from '../../data/dummy-data';
import Label from '../../models/label';

export const LabelContext = createContext({
  labels: [],
  addLabel: (name) => {},
  updateLabel: (id, name) => {},
  searchLabels: (query) => [],
  deleteLabel: (id) => {},
});

export const LabelProvider = ({ children }) => {
  const [labels, setLabels] = useState(LABELS);

  const addLabel = (name) => {
    const newLabel = new Label(Math.random().toString(), name);
    setLabels((prevLabels) => [...prevLabels, newLabel]);
  };

  const updateLabel = (id, newName) => {
    setLabels((prevLabels) =>
      prevLabels.map((label) => (label.id === id ? { ...label, label: newName } : label))
    );
  };

  const deleteLabel = (id) => {
    setLabels((prevLabels) => prevLabels.filter((label) => label.id !== id));
  };

  const searchLabels = (query) => {
    return labels.filter((label) => label.label.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <LabelContext.Provider value={{ labels, addLabel, updateLabel, deleteLabel, searchLabels }}>
      {children}
    </LabelContext.Provider>
  );
};