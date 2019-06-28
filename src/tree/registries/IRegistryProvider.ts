/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzExtParentTreeItem } from "vscode-azureextensionui";
import { RegistryApi } from "./all/RegistryApi";
import { ILogInWizardOptions } from "./logInWizard/ILogInWizardOptions";

export interface IRegistryProvider {
    /**
     * A unique id for this registry provider
     */
    id: string;

    /**
     * The api used by this provider
     */
    api: RegistryApi;

    /**
     * Primary value to display when prompting a user to connect a provider
     */
    label: string;

    /**
     * Optional secondary value to display when prompting a user to connect a provider
     */
    description?: string;

    /**
     * Optional tertiary value to display when prompting a user to connect a provider
     */
    detail?: string;

    /**
     * Set to true if this provider maps to a single registry as opposed to multiple registries
     * If it maps to a single registry, it will be grouped under a "Connected Registries" node in the tree.
     */
    isSingleRegistry?: boolean;

    /**
     * Set to true if only a single instance of this provider can be connected at a time
     */
    onlyOneAllowed?: boolean;

    /**
     * Describes the wizard to be used when connecting this provider
     */
    logInOptions?: ILogInWizardOptions;

    /**
     * The tree item class to instantiate after a provider is connected
     */
    treeItemType: new (parent: AzExtParentTreeItem, cached: ICachedRegistryProvider) => AzExtParentTreeItem & IRegistryProviderTreeItem;
}

/**
 * Basic _non-sensitive_ information that will be cached across sessions
 */
export interface ICachedRegistryProvider {
    id: string;
    api: RegistryApi;
    url?: string;
    username?: string;
}

export interface IRegistryProviderTreeItem {
    cachedProvider: ICachedRegistryProvider;
}