import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { dataType } from '../services/ajax';
import { getSingleQuestion } from '../services/questions';

export function useLoadSingleQuestion() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState<dataType>();
  async function getQuestionInfo(id: string) {
    try {
      const data = await getSingleQuestion(id);
      if (data) {
        setQuestionData(data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getQuestionInfo(id as string);
  }, []);
  return { loading, questionData };
}
