import React, { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex items-center justify-center h-screen flex-col text-center p-4'>
          <h1 className='text-3xl font-bold'>Erro inesperado</h1>
          <p className='text-gray-500 mt-2'>
            Tente recarregar a página ou contate o suporte.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
