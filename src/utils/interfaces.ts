export interface JwtPayload {
    id: number;
    createdAt: number;
}

interface NodemailerMultiReceivers {
    address: string;
    name: string;
}

export interface EmailOptions {
    from?: string;
    to: string | NodemailerMultiReceivers[];
    subject: string;
    text?: string;
    html?: string;
}
