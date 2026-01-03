import React from 'react';
import { View } from 'react-native';

interface Props {
  className?: string;
}

export function Divider({ className = '' }: Props) {
  return <View className={`h-[1px] bg-slate-100 w-full my-4 ${className}`} />;
}