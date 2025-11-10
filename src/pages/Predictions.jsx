import React, { useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

const Predictions = () => {
  const [ensembleData, setEnsembleData] = useState(null);
  const [stressData, setStressData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchEnsemble = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/predictions/ensemble");
      setEnsembleData(res.data);
      setModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStress = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/predictions/stress");
      setStressData(res.data);
      setModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Predictions</h1>

      <button
        onClick={fetchEnsemble}
        className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
      >
        Show Ensemble Prediction
      </button>

      <button
        onClick={fetchStress}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Show Stress Test
      </button>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Results">
        {ensembleData && (
          <div>
            <h3 className="font-semibold">Ensemble Prediction:</h3>
            <p>Ensemble: {ensembleData.ensemble}</p>
            <p>XGB: {ensembleData.xgb}</p>
            <p>LSTM: {ensembleData.lstm}</p>
            <p>Prophet: {ensembleData.prophet}</p>
          </div>
        )}

        {stressData && (
          <div className="mt-4">
            <h3 className="font-semibold">Stress Test:</h3>
            <p>VaR 95%: {stressData.var_95}</p>
            <p>VaR 99%: {stressData.var_99}</p>
            <p>Expected Shortfall: {stressData.expected_shortfall}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Predictions;
