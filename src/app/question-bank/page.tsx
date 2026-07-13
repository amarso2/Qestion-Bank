import React from 'react';
import AppLayout from '@/components/AppLayout';
import QuestionBankContent from './components/QuestionBankContent';

export default function QuestionBankPage() {
  return (
    <AppLayout activeRoute="/question-bank">
      <QuestionBankContent />
    </AppLayout>
  );
}
